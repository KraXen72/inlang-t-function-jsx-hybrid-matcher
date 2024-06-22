/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * Using parsimmon because:
 *
 * 1. Chevrotain is too complicated.
 * 2. TypeScript's compiler doesn't work in the browser.
 * 3. TypeScripts compiler
 */
import Parsimmon from "parsimmon"
import type { PluginSettings } from "../settings.js"

export function createMessageReferenceParser(translateFunctionNames: string[], jsxAttributes: string[]) {
	const parser = Parsimmon.createLanguage({
		// The entry point for message reference matching.
		//
		// 1. Match a t function call or any other character.
		// 2. Match as many of these as possible.
		// 3. Filter out any non-object matches.
		entry: (r) => {
			return Parsimmon.alt(Parsimmon.alt(r.FunctionCall!, r.JSXAttribute!), Parsimmon.any)
				.many()
				.map((matches) => matches.flat().filter((match) => typeof match === "object")); // filter arbitrary characters
		},

		// A string literal is either a single or double quoted string
		stringLiteral: (r) => {
			return Parsimmon.alt(r.doubleQuotedString!, r.singleQuotedString!);
		},

		// Double quoted string literal parser
		//
		// 1. Start with a double quote.
		// 2. Then match any character that is not a double quote.
		// 3. End with a double quote.
		doubleQuotedString: () => {
			return Parsimmon.string('"')
				.then(Parsimmon.regex(/[^"]*/))
				.skip(Parsimmon.string('"'));
		},

		// Single quoted string literal parser
		//
		// 1. Start with a single quote.
		// 2. Then match any character that is not a single quote.
		// 3. End with a single quote.
		singleQuotedString: () => {
			return Parsimmon.string("'")
				.then(Parsimmon.regex(/[^']*/))
				.skip(Parsimmon.string("'"));
		},

		// Parser for t function calls
		FunctionCall: function (r) {
			return Parsimmon.seqMap(
				Parsimmon.regex(/[^a-zA-Z0-9]/), // no preceding letters or numbers
				Parsimmon.alt(...(translateFunctionNames.map((fname) => Parsimmon.string(fname).skip(Parsimmon.string("("))))), 
				Parsimmon.index, // start position of the message id
				r.stringLiteral!, // message id
				Parsimmon.index, // end position of the message id
				Parsimmon.regex(/[^)]*/), // ignore the rest of the function call
				Parsimmon.string(")"), // end with a closing parenthesis
				(_, __,start, messageId, end) => {
					console.log("tfunc", __)
					return {
						messageId,
						position: {
							start: {
								line: start.line,
								character: start.column,
							},
							end: {
								line: end.line,
								character: end.column,
							},
						},
					};
				}
			);
		},

		JSXAttribute: function (r) {
			return Parsimmon.seqMap(
				Parsimmon.string("<"),
				Parsimmon.regex(/[A-Z][\w-]*/), // JSX component name (allowing hyphens)
				Parsimmon.regex(/\s+/), // skip whitespace
				Parsimmon.index,
				Parsimmon.sepBy1(
					Parsimmon.seq(
						Parsimmon.regex(/\w+/).skip(Parsimmon.regex(/\s*=\s*/)), // attribute name followed by equal sign
						r.stringLiteral // attribute value
					),
					Parsimmon.regex(/\s+/) // skip whitespace between attributes
				),
				Parsimmon.index,
				(_, componentName, __, start, attributesRaw, end) => {
					// console.log("ComponentName:", componentName);
					// console.log("Attributes:", attributesRaw);
					const matches: any[] = [];
					for (const [name, value] of attributesRaw) {
						if (!jsxAttributes.includes(name)) continue;
						// console.log("Message ID:", value);
						matches.push({
							messageId: value,
							position: {
								start: {
									line: start.line,
									character: start.column,
								},
								end: {
									line: end.line,
									character: end.column,
								},
							},
						})
					}
					return matches.length > 0 ? matches : false;
				}
			)
		},
	});
	return parser
}

// Parse the expression
export function parse(sourceCode: string, settings: PluginSettings) {
	try {
		const parser = createMessageReferenceParser(
			settings?.recognizedTfuncNames ?? ['t'],
			settings?.recognizedJSXAttributes ?? ['']
		)
		return parser.entry!.tryParse(sourceCode)
	} catch {
		return []
	}
}
