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

	// Try parsing with multiple strategies, from most accurate to most tolerant
	const parseStrategies = [
		() => parseWithStandardConfig(sourceCode),
		() => parseWithWrappedJSX(sourceCode),
		() => parseAsExpression(sourceCode),
		() => parseWithFixedSyntax(sourceCode)
	];

	for (const strategy of parseStrategies) {
		try {
			const ast = strategy();
			if (ast) {
				traverseNode(ast, sourceCode, matches, config);
				return matches; // Success, return early
			}
		// oxlint-disable-next-line no-unused-vars
		} catch (error) {
			// Continue to next strategy
			continue;
		}
	}

	// If all parsing strategies fail, return empty array
	// In IDE context, this is acceptable as highlights will reappear when code becomes valid
	console.warn("All parsing strategies failed, returning empty matches");
	return matches;
}

/**
 * Parse with standard configuration
 */
function parseWithStandardConfig(sourceCode: string) {
	return parseTypeScript(sourceCode, {
		jsx: true,
		range: true,
		loc: true,
		errorOnUnknownASTType: false,
		errorOnTypeScriptSyntacticAndSemanticIssues: false,
		allowInvalidAST: true,
		tokens: false,
		comment: false
	});
}

/**
 * Wrap JSX fragments in a valid parent element
 */
function parseWithWrappedJSX(sourceCode: string) {
	// If it looks like JSX fragments, wrap them
	if (sourceCode.includes('<') && !sourceCode.trim().startsWith('<>') && !sourceCode.includes('function') && !sourceCode.includes('const ')) {
		const wrappedCode = `<>${sourceCode}</>`;
		return parseTypeScript(wrappedCode, {
			jsx: true,
			range: true,
			loc: true,
			errorOnUnknownASTType: false,
			errorOnTypeScriptSyntacticAndSemanticIssues: false,
			allowInvalidAST: true,
			tokens: false,
			comment: false
		});
	}
	return null;
}

/**
 * Parse as expression wrapped in parentheses
 */
function parseAsExpression(sourceCode: string) {
	const wrappedCode = `(${sourceCode})`;
	return parseTypeScript(wrappedCode, {
		jsx: true,
		range: true,
		loc: true,
		errorOnUnknownASTType: false,
		errorOnTypeScriptSyntacticAndSemanticIssues: false,
		allowInvalidAST: true,
		tokens: false,
		comment: false
	});
}

/**
 * Fix common syntax issues and try parsing
 */
function parseWithFixedSyntax(sourceCode: string) {
	let fixedCode = sourceCode;
	
	// Fix unterminated strings by adding closing quotes
	const lines = fixedCode.split('\n');
	const fixedLines = lines.map(line => {
		// Simple heuristic: if line has uneven quotes, try to close them
		const doubleQuotes = (line.match(/"/g) || []).length;
		const singleQuotes = (line.match(/'/g) || []).length;
		
		if (doubleQuotes % 2 === 1) {
			line += '"';
		}
		if (singleQuotes % 2 === 1) {
			line += "'";
		}
		return line;
	});
	
	fixedCode = fixedLines.join('\n');
	
	// Try wrapping in a component if it looks like JSX
	if (fixedCode.includes('<') && !fixedCode.includes('function')) {
		fixedCode = `function TempComponent() { return (${fixedCode}); }`;
	}
	
	return parseTypeScript(fixedCode, {
		jsx: true,
		range: true,
		loc: true,
		errorOnUnknownASTType: false,
		errorOnTypeScriptSyntacticAndSemanticIssues: false,
		allowInvalidAST: true,
		tokens: false,
		comment: false
	});
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
	console.log("handleFunctionCall matched location:", firstArg)

	// Extract position information
	if (firstArg.range && firstArg.loc) {
		const messageId = firstArg.value;
		// Convert to line-relative, one-based positions excluding quotes
		const startCharInLine = firstArg.loc.start.column + 1;
		const endCharInLine = firstArg.loc.end.column + 1;

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
	let valueLoc: TSESTree.SourceLocation;

	if (value.type === 'Literal' && typeof value.value === 'string') {
		// Direct string: tx="message"
		messageId = value.value;
		valueLoc = value.loc!;

	} else if (value.type === 'JSXExpressionContainer' && value.expression.type === 'Literal' && typeof value.expression.value === 'string') {
		// Expression with string: tx={"message"}
		messageId = value.expression.value;
		valueLoc = value.expression.loc!;

	} else if (value.type === 'JSXExpressionContainer' && value.expression.type === 'TemplateLiteral' && value.expression.expressions.length === 0 && value.expression.quasis.length === 1) {
		// Template literal without interpolation: tx={`message`}
		const quasiValue = value.expression.quasis[0]?.value;
		if (!quasiValue || (!quasiValue.cooked && !quasiValue.raw)) return;
		messageId = quasiValue.cooked || quasiValue.raw || '';
		if (!messageId) return;

		valueLoc = value.expression.loc!;
	} else { 
		return;
	}

	// Convert to line-relative, one-based positions excluding quotes
	const startCharInLine = valueLoc.start.column + 1 + 1; // +1 for quote, +1 for one-based
	const endCharInLine = valueLoc.end.column + 1; // +1 for one-based, end column is already after the content

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




