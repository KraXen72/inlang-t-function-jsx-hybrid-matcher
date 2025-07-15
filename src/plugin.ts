import type { InlangPlugin } from "@inlang/sdk"
import { PluginSettings, type IPluginSettings } from "./settings.js"
import { ideExtensionConfigFactory } from "./ideExtension/config.js"

import manifest from "../marketplace-manifest.json" with { type: "json" }
const { displayName, description } = manifest;

const id = "plugin.minibits.inlangmatcher"

export const plugin: InlangPlugin<{
	[id]: IPluginSettings
}> = {
	key: id,
	displayName,
	description,
	settingsSchema: PluginSettings,
	meta: (settings) => ({
		"app.inlang.ideExtension": ideExtensionConfigFactory(settings["plugin.minibits.inlangmatcher"])
	})
}
	}
}
