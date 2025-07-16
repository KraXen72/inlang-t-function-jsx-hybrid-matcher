import { parse as parseBabel } from '@babel/parser';
import type { 
	SourceLocation,
	CallExpression,
	JSXAttribute,
	Expression
} from '@babel/types';
import type { IPluginSettings } from '../settings';

/**
 * it's supposed to return 1 extra character worth of col. offset at the end,
 * to place the message there nicely (after the string has ended)
 */
interface MessageReferenceMatch {
	bundleId: string;
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
 * Parse JSX/TSX source code using Babel parser
 * Handles both function calls and JSX attributes
 */
export function parse(sourceCode: string, config: IPluginSettings = DEFAULT_CONFIG): MessageReferenceMatch[] {
	const matches: MessageReferenceMatch[] = [];

	// Try parsing strategies in order
	const strategies = [
		() => parseAsIs(sourceCode),
		() => parseWithWrapper(sourceCode)
	];

	for (const strategy of strategies) {
		try {
			const ast = strategy();
			if (ast) {
				traverseNode(ast, sourceCode, matches, config);
				return matches;
			}
		} catch {
			continue; // Try next strategy
		}
	}

	// If all strategies fail, return empty array
	console.warn("Parsing failed, returning empty matches");
	return matches;
}

/**
 * Parse source code as-is
 */
function parseAsIs(sourceCode: string) {
	return parseBabel(sourceCode, {
		sourceType: 'module',
		allowImportExportEverywhere: true,
		allowReturnOutsideFunction: true,
		plugins: [
			'jsx',
			'typescript',
			'decorators-legacy',
			'objectRestSpread',
			'functionBind',
			'exportDefaultFrom',
			'exportNamespaceFrom',
			'dynamicImport',
			'nullishCoalescingOperator',
			'optionalChaining'
		],
		errorRecovery: true
	});
}

/**
 * Parse source code wrapped in JSX fragment to handle adjacent elements
 */
function parseWithWrapper(sourceCode: string) {
	const wrappedCode = `<>${sourceCode.trim()}</>`;
	return parseBabel(wrappedCode, {
		sourceType: 'module',
		allowImportExportEverywhere: true,
		allowReturnOutsideFunction: true,
		plugins: [
			'jsx',
			'typescript',
			'decorators-legacy',
			'objectRestSpread',
			'functionBind',
			'exportDefaultFrom',
			'exportNamespaceFrom',
			'dynamicImport',
			'nullishCoalescingOperator',
			'optionalChaining'
		],
		errorRecovery: true
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

function createPositionObject(bundleId: string, loc: SourceLocation): MessageReferenceMatch {
	// Babel parser column offsets are 0-based
	// inlang's Sherlock expects 1-based column offsets (atleast from what i can tell their t-func matcher is sending from parsimmon)
	// Babel gives offsets for the raw string, e.g. for:
  // "some-id"
	// the column offsets are: { start: 0, end: 9 }
	// we need 1-based, so we'd add +1 to both: { start: 1, end: 10 }
	// to skip the initial ",' or ` we add +1 to the start: { start: 2, end: 10 }

	return {
		bundleId,
		position: {
			start: {
				line: loc.start.line,
				character: loc.start.column + 2
			},
			end: {
				line: loc.end.line,
				character: loc.end.column + 1
			}
		}
	} satisfies MessageReferenceMatch
}

function handleFunctionCall(
	node: CallExpression,
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
	if (!firstArg || firstArg.type !== 'StringLiteral' || typeof firstArg.value !== 'string') {
		return;
	}

	// Extract position information
	if (firstArg.loc) {
		const bundleId = firstArg.value;
		matches.push(createPositionObject(bundleId, firstArg.loc));
	}
}

function handleJSXAttribute(
	node: JSXAttribute,
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

	let bundleId: string;
	let valueLoc: SourceLocation;

	if (value.type === 'StringLiteral' && typeof value.value === 'string') {
		// Direct string: tx="message"
		bundleId = value.value;
		valueLoc = value.loc!;

	} else if (value.type === 'JSXExpressionContainer' && value.expression.type === 'StringLiteral' && typeof value.expression.value === 'string') {
		// Expression with string: tx={"message"}
		bundleId = value.expression.value;
		valueLoc = value.expression.loc!;

	} else if (value.type === 'JSXExpressionContainer' && value.expression.type === 'TemplateLiteral' && value.expression.expressions.length === 0 && value.expression.quasis.length === 1) {
		// Template literal without interpolation: tx={`message`}
		const quasiValue = value.expression.quasis[0]?.value;
		if (!quasiValue || (!quasiValue.cooked && !quasiValue.raw)) return;
		bundleId = quasiValue.cooked || quasiValue.raw || '';
		if (!bundleId) return;

		valueLoc = value.expression.loc!;
	} else { 
		return;
	}

	matches.push(createPositionObject(bundleId, valueLoc));
}

function getFunctionName(callee: Expression | any): string | null {
	if (callee.type === 'Identifier') {
		return callee.name;
	}
	if (callee.type === 'MemberExpression' && callee.property.type === 'Identifier') {
		return callee.property.name;
	}
	return null;
}




