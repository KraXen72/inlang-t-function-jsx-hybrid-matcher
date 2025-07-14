import type { CustomApiInlangIdeExtension, Plugin } from "@inlang/plugin";
import type { IPluginSettings } from "../settings.js";
import { parse } from "./messageReferenceMatchers.js";

type EMOcallbackArgs = { bundleId: string, selection: string }

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
				callback: (args: EMOcallbackArgs) => ({
					bundleId: args.bundleId,
					messageReplacement: `"${args.bundleId}"`,
				}),
			},
			{
				callback: (args: EMOcallbackArgs) => ({
					bundleId: args.bundleId,
					messageReplacement: `${settings?.preferredTfuncName ?? 't'}("${args.bundleId}")`,
				}),
			},
			{
				callback: (args: EMOcallbackArgs) => ({
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
		
	} satisfies CustomApiInlangIdeExtension,
})
