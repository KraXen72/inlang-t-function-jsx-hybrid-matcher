/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * Using parsimmon because:
 * inlang said so :pensive:
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
				Parsimmon.sepBy1(
					Parsimmon.seq(
						Parsimmon.regex(/\w+/) // attribute name
							.skip(Parsimmon.regex(/\s*=\s*{?/)), // equal sign and optional {
						Parsimmon.index,
						r.stringLiteral, // attribute value
					),
					Parsimmon.regex(/}?\s+/) // skip whitespace between attributes
				),
				(_, componentName, __, attributesRaw) => {
					// console.log("ComponentName:", componentName);
					// console.log("Attributes:", attributesRaw);
					const matches: any[] = [];
					for (const [name, start, value] of attributesRaw) {
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
									line: start.line,
									character: start.column + value.length + 3
								}

								// this caused a hard-to-debug bug in vscode
								// https://github.com/microsoft/vscode/blob/b6924a1d2e5249f97d1a5e6d3a1ad0edb2e33544/src/vs/workbench/api/common/extHostTypes.ts#L162
								// basically, it would set it to the 0th character of the next line
								// end: {
								// 	line: end.line,
								// 	character: end.column,
								// },
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
