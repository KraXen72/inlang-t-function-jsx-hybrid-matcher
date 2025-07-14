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
		
		// previously it was messageId, now they changed it to bundleId
		// but i guess we're still using the old types bc the whole addCustomApi thing
		// either changed or dissapeared if we migrate from @inlang/plugin to @inlang/sdk
		extractMessageOptions: [
			{
				// @ts-ignore
				callback: (args: EMOcallbackArgs) => ({
					bundleId: args.bundleId,
					messageReplacement: `"${args.bundleId}"`,
				}),
			},
			{
				// @ts-ignore
				callback: (args: EMOcallbackArgs) => ({
					bundleId: args.bundleId,
					messageReplacement: `${settings?.preferredTfuncName ?? 't'}("${args.bundleId}")`,
				}),
			},
			{
				// @ts-ignore
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
