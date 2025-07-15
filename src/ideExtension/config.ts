import type { IPluginSettings } from "../settings.js";
import { parse } from "./messageReferenceMatchers.js";

type EMOcallbackArgs = { messageId: string, selection: string }

export const ideExtensionConfigFactory = (
	settings: IPluginSettings
) => ({
	messageReferenceMatchers: [
		async (args: { documentText: string }) => {
			return parse(args.documentText, settings)
		},
	],
	
	extractMessageOptions: [
		{
			callback: (args: EMOcallbackArgs) => ({
				messageId: args.messageId,
				messageReplacement: `"${args.messageId}"`,
			}),
		},
		{
			callback: (args: EMOcallbackArgs) => ({
				messageId: args.messageId,
				messageReplacement: `${settings?.preferredTfuncName ?? 't'}("${args.messageId}")`,
			}),
		},
		{
			callback: (args: EMOcallbackArgs) => ({
				messageId: args.messageId,
				messageReplacement: `{${settings?.preferredTfuncName ?? 't'}("${args.messageId}")}`,
			}),
		}
	],
	documentSelectors: [
		{ language: "typescriptreact", },
		{ language: "javascript", },
		{ language: "typescript", },
		{ language: "svelte", },
		{ language: "astro", },
		{ language: "vue", },
	],
})
