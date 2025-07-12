import { parse } from "./messageReferenceMatchers.js";

export const config = {
	messageReferenceMatchers: [
		async (args: { documentText: string }) => {
			// You can customize the configuration here
			return parse(args.documentText, {
				functionNames: ['t', 'translate', 'i18n'],
				jsxAttributes: ['tx', 'i18nKey', 'translationKey']
			});
		},
	],
}