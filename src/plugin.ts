import { Plugin } from "@inlang/plugin"
import { PluginSettings, type IPluginSettings } from "./settings.js"
import { ideExtensionConfigFactory } from "./ideExtension/config.js"

import manifest from "../marketplace-manifest.json" with { type: "json" }
const { displayName, description } = manifest;

const id = "plugin.minibits.inlangmatcher"

export const plugin: Plugin<{
	[id]: IPluginSettings
}> = {
	id,
	displayName,
	description,
	settingsSchema: PluginSettings,
	addCustomApi: ({ settings }) => ideExtensionConfigFactory(settings["plugin.minibits.inlangmatcher"]),
}
