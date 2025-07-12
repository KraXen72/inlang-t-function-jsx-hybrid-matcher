import { parse as parseTypeScript } from '@typescript-eslint/typescript-estree';
import type { TSESTree } from '@typescript-eslint/typescript-estree';
import type { IPluginSettings } from '../settings';

interface MessageReferenceMatch {
	messageId: string;
	position: {
		start: {
			line: number;
			character: number;
		};
		end: {
			line: number;
			character: number;
		};
	};
}

// Default configuration - can be made configurable later
const DEFAULT_CONFIG: IPluginSettings = {
	recognizedTfuncNames: ['t', 'translate', 'i18n'],
	recognizedJSXAttributes: ['tx', 'i18nKey', 'translationKey']
};

/**
 * Enhanced parser using TypeScript ESTree for robust JSX/TSX parsing
 * Handles both function calls and JSX attributes with proper error recovery
 */
export function parse(sourceCode: string, config: IPluginSettings = DEFAULT_CONFIG): MessageReferenceMatch[] {
	const matches: MessageReferenceMatch[] = [];

	try {
		// Parse with TypeScript ESTree - handles JSX/TSX robustly
		const ast = parseTypeScript(sourceCode, {
			jsx: true,
			range: true,
			loc: true,
			errorOnUnknownASTType: false,
			errorOnTypeScriptSyntacticAndSemanticIssues: false,
			allowInvalidAST: true, // Allow parsing of incomplete/invalid code
			tokens: false,
			comment: false
		});

		// Traverse the AST to find matches
		traverseNode(ast, sourceCode, matches, config);

	} catch (error) {
		console.error("parsing failed: ", error);
		return []

		// If parsing fails completely, try to extract simple patterns with regex fallback
		// return parseWithRegexFallback(sourceCode, config);
	}

	return matches;
}

function traverseNode(
	node: any,
	sourceCode: string,
	matches: MessageReferenceMatch[],
	config: IPluginSettings
): void {
	if (!node || typeof node !== 'object') return;

	// Handle function calls: t("message"), translate("message"), etc.
	if (node.type === 'CallExpression') {
		handleFunctionCall(node, sourceCode, matches, config);
	}

	// Handle JSX attributes: <Text tx="message" />
	if (node.type === 'JSXAttribute') {
		handleJSXAttribute(node, sourceCode, matches, config);
	}

	// Recursively traverse child nodes
	for (const key in node) {
		const child = node[key];
		if (Array.isArray(child)) {
			child.forEach(item => traverseNode(item, sourceCode, matches, config));
		} else if (child && typeof child === 'object') {
			traverseNode(child, sourceCode, matches, config);
		}
	}
}

function handleFunctionCall(
	node: TSESTree.CallExpression,
	sourceCode: string,
	matches: MessageReferenceMatch[],
	config: IPluginSettings
): void {
	// Check if it's a function we're interested in
	const functionName = getFunctionName(node.callee);
	if (!functionName || !config?.recognizedTfuncNames || !config.recognizedTfuncNames.includes(functionName)) {
		return;
	}

	// Get the first argument (should be the message key)
	const firstArg = node.arguments[0];
	if (!firstArg || firstArg.type !== 'Literal' || typeof firstArg.value !== 'string') {
		return;
	}

	// Extract position information
	if (firstArg.range && firstArg.loc) {
		const messageId = firstArg.value;
		const [start, end] = firstArg.range;

		// Adjust positions to exclude quotes
		const startCharInLine = findQuoteStartInLine(sourceCode, start, firstArg.loc.start);
		const endCharInLine = findQuoteEndInLine(sourceCode, end, firstArg.loc.end);

		// all line offsets should be one-based according to Parismmon and inlang's t-func-matcher
		matches.push({
			messageId,
			position: {
				start: {
					line: firstArg.loc.start.line,
					character: startCharInLine
				},
				end: {
					line: firstArg.loc.end.line,
					character: endCharInLine
				}
			}
		});
	}
}

function handleJSXAttribute(
	node: TSESTree.JSXAttribute,
	sourceCode: string,
	matches: MessageReferenceMatch[],
	config: IPluginSettings
): void {
	// Check if it's an attribute we're interested in
	if (node.name.type !== 'JSXIdentifier') return;

	const attributeName = node.name.name;
	if (!attributeName || !config.recognizedJSXAttributes || !config.recognizedJSXAttributes.includes(attributeName)) {
		return;
	}

	// Get the attribute value
	const value = node.value;
	if (!value) return;

	let messageId: string;
	let valueRange: [number, number];
	let valueLoc: TSESTree.SourceLocation;

	if (value.type === 'Literal' && typeof value.value === 'string') {
		// Direct string: tx="message"
		messageId = value.value;
		valueRange = value.range!;
		valueLoc = value.loc!;
	} else if (
		value.type === 'JSXExpressionContainer' &&
		value.expression.type === 'Literal' &&
		typeof value.expression.value === 'string') {
		// Expression with string: tx={"message"}
		messageId = value.expression.value;
		valueRange = value.expression.range!;
		valueLoc = value.expression.loc!;
	} else if (
		value.type === 'JSXExpressionContainer' &&
		value.expression.type === 'TemplateLiteral' &&
		value.expression.expressions.length === 0 &&
		value.expression.quasis.length === 1) {
		// Template literal without interpolation: tx={`message`}
		messageId = value.expression.quasis[0].value.cooked || value.expression.quasis[0].value.raw;
		valueRange = value.expression.range!;
		valueLoc = value.expression.loc!;
	} else {
		return;
	}

	// Extract position information
	const [start, end] = valueRange;
	const startCharInLine = findQuoteStartInLine(sourceCode, start, valueLoc.start);
	const endCharInLine = findQuoteEndInLine(sourceCode, end, valueLoc.end);

	matches.push({
		messageId,
		position: {
			start: {
				line: valueLoc.start.line,
				character: startCharInLine
			},
			end: {
				line: valueLoc.end.line,
				character: endCharInLine
			}
		}
	});
}

function getFunctionName(callee: TSESTree.Expression): string | null {
	if (callee.type === 'Identifier') {
		return callee.name;
	}
	if (callee.type === 'MemberExpression' && callee.property.type === 'Identifier') {
		return callee.property.name;
	}
	return null;
}

function findQuoteStartInLine(sourceCode: string, absolutePosition: number, loc: { line: number; column: number }): number {
	// Find the opening quote and return line-relative character position (after the quote)
	const char = sourceCode[absolutePosition];
	if (char === '"' || char === "'") {
		return loc.column + 1;
	}
	return loc.column;
}

function findQuoteEndInLine(sourceCode: string, absolutePosition: number, loc: { line: number; column: number }): number {
	// Find the closing quote and return line-relative character position (before the quote)
	const char = sourceCode[absolutePosition - 1];
	if (char === '"' || char === "'") {
		return loc.column - 1;
	}
	return loc.column;
}

/**
 * Fallback regex-based parser for when AST parsing fails
 * Less accurate but handles severely malformed code
 */
// function parseWithRegexFallback(sourceCode: string, config: ParserConfig): MessageReferenceMatch[] {
// 	const matches: MessageReferenceMatch[] = [];

// 	// Create regex patterns for function calls
// 	const functionPattern = new RegExp(
// 		`\\b(${config.functionNames.join('|')})\\s*\\(\\s*(['"\`])([^'"\`]*?)\\2`,
// 		'g'
// 	);

// 	// Create regex patterns for JSX attributes
// 	const jsxPattern = new RegExp(
// 		`\\b(${config.jsxAttributes.join('|')})\\s*=\\s*(['"\`])([^'"\`]*?)\\2`,
// 		'g'
// 	);

// 	// Find function call matches
// 	let match;
// 	while ((match = functionPattern.exec(sourceCode)) !== null) {
// 		const messageId = match[3];
// 		const fullMatch = match[0];
// 		const startIndex = match.index + fullMatch.indexOf(match[2]) + 1; // After opening quote
// 		const endIndex = startIndex + messageId.length;

// 		matches.push({
// 			messageId,
// 			position: {
// 				start: getLineAndColumn(sourceCode, startIndex),
// 				end: getLineAndColumn(sourceCode, endIndex)
// 			}
// 		});
// 	}

// 	// Find JSX attribute matches
// 	while ((match = jsxPattern.exec(sourceCode)) !== null) {
// 		const messageId = match[3];
// 		const fullMatch = match[0];
// 		const startIndex = match.index + fullMatch.indexOf(match[2]) + 1; // After opening quote
// 		const endIndex = startIndex + messageId.length;

// 		matches.push({
// 			messageId,
// 			position: {
// 				start: getLineAndColumn(sourceCode, startIndex),
// 				end: getLineAndColumn(sourceCode, endIndex)
// 			}
// 		});
// 	}

// 	return matches;
// }

// function getLineAndColumn(sourceCode: string, index: number): { line: number; character: number } {
// 	const lines = sourceCode.substring(0, index).split('\n');
// 	return {
// 		line: lines.length,
// 		character: lines[lines.length - 1].length
// 	};
// }