import type { CustomApiInlangIdeExtension, Plugin } from "@inlang/plugin";
import type { IPluginSettings } from "../settings.js";
import { parse } from "./messageReferenceMatchers.js";

export const ideExtensionConfigFactory = (
	settings: IPluginSettings
): ReturnType<Exclude<Plugin["addCustomApi"], undefined>> => ({
	"app.inlang.ideExtension": {
		messageReferenceMatchers: [
			async (args: { documentText: string }) => {
				return parse(args.documentText, settings)
			},
		],
		
		extractMessageOptions: [
			{
				callback: (args: { messageId: string }) => ({
					messageId: args.messageId,
					messageReplacement: `"${args.messageId}"`,
				}),
			},
			{
				callback: (args: { messageId: string }) => ({
					messageId: args.messageId,
					messageReplacement: `${settings?.preferredTfuncName ?? 't'}("${args.messageId}")`,
				}),
			},
			{
				callback: (args: { messageId: string }) => ({
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
	} satisfies CustomApiInlangIdeExtension,
})
