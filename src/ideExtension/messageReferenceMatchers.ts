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
				.map((matches) => {
					// filter arbitrary characters
					return matches.filter((match) => typeof match === "object")
				})
		},
	
		// A string literal is either a single or double quoted string
		stringLiteral: (r) => {
			return Parsimmon.alt(r.doubleQuotedString!, r.singleQuotedString!)
		},
	
		// Double quoted string literal parser
		//
		// 1. Start with a double quote.
		// 2. Then match any character that is not a double quote.
		// 3. End with a double quote.
		doubleQuotedString: () => {
			return Parsimmon.string('"').then(Parsimmon.regex(/[^"]*/)).skip(Parsimmon.string('"'))
		},
	
		// Single quoted string literal parser
		//
		// 1. Start with a single quote.
		// 2. Then match any character that is not a single quote.
		// 3. End with a single quote.
		singleQuotedString: () => {
			return Parsimmon.string("'").then(Parsimmon.regex(/[^']*/)).skip(Parsimmon.string("'"))
		},

		// Parser for t function calls
		FunctionCall: function (r) {
			return Parsimmon.seqMap(
				Parsimmon.regex(/[^a-zA-Z0-9]/), // no preceding letters or numbers
				Parsimmon.alt(...translateFunctionNames.map(Parsimmon.string)), // support multiple translate function
				Parsimmon.string("("), // then an opening parenthesis
				Parsimmon.index, // start position of the message id
				r.stringLiteral!, // message id
				Parsimmon.index, // end position of the message id
				Parsimmon.regex(/[^)]*/), // ignore the rest of the function call
				Parsimmon.string(")"), // end with a closing parenthesis
				(_, __, ___, start, messageId, end) => {
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
					}
				}
			)
		},

		// Parser for JSX attribute
		jsxComponentOpeningTag: (r) => {
			return Parsimmon.string("<").then(Parsimmon.regex(/[A-Z]\w*/)).skip(Parsimmon.string(">"))
		},
		jsxComponentClosingTag: (r) => {
			return Parsimmon.string("</").then(Parsimmon.regex(/[^>]*/)).skip(Parsimmon.string(">"))
		},

		JSXAttribute: function (r) {
			return Parsimmon.seqMap(
				Parsimmon.regex(/[^a-zA-Z0-9]/),
				r.jsxComponentOpeningTag!,
				Parsimmon.alt(...jsxAttributes.map(Parsimmon.string)),
				Parsimmon.index, // start position of the message id
				r.stringLiteral!, // message id
				Parsimmon.index, // end position of the message id
				r.jsxComponentClosingTag!,
				(_, __, ___, start, messageId, end) => {
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
					}
				}
			)
		}
	})

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
