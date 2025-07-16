import type { InlangPlugin } from "@inlang/sdk"
import type { IPluginSettings } from "./settings.js"
import { ideExtensionConfigFactory } from "./ideExtension/config.js"

import manifest from "../marketplace-manifest.json" with { type: "json" }
const { displayName, description } = manifest;

const key = "plugin.minibits.inlangmatcher"

export const plugin: InlangPlugin<IPluginSettings> = {
	key,
	// Using the deprecated addCustomApi since it properly supports dynamic configuration
	addCustomApi: ({ settings }) => ({
		"app.inlang.ideExtension": ideExtensionConfigFactory(settings),
	}),
	meta: {
		displayName,
		description,
	},
}
