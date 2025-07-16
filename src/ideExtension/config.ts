import type { IdeExtensionConfig } from "@inlang/sdk"
import type { IPluginSettings } from "../settings.js"
import { parse } from "./messageReferenceMatchers.js"

export const ideExtensionConfigFactory = (
	settings: IPluginSettings
): IdeExtensionConfig => ({
	messageReferenceMatchers: [
		async (args: { documentText: string }) => {
			return parse(args.documentText, settings)
		},
	],
	
	extractMessageOptions: [
		{
			callback: (args: { bundleId: string; selection: string }) => ({
				bundleId: args.bundleId,
				messageReplacement: `"${args.bundleId}"`,
			}),
		},
		{
			callback: (args: { bundleId: string; selection: string }) => ({
				bundleId: args.bundleId,
				messageReplacement: `${settings?.preferredTfuncName ?? 't'}("${args.bundleId}")`,
			}),
		},
		{
			callback: (args: { bundleId: string; selection: string }) => ({
				bundleId: args.bundleId,
				messageReplacement: `{${settings?.preferredTfuncName ?? 't'}("${args.bundleId}")}`,
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
