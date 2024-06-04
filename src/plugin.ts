import { Plugin } from "@inlang/plugin"
import { displayName, description } from "../marketplace-manifest.json"
import { PluginSettings, type IPluginSettings } from "./settings.js"
import { ideExtensionConfig } from "./ideExtension/config.js"

const id = "plugin.minibits.t-function-jsx-hybrid-matcher"

export const plugin: Plugin<{
	[id]: IPluginSettings
}> = {
	id,
	displayName,
	settingsSchema: PluginSettings,
	description,
	addCustomApi: ({ settings }) => ideExtensionConfig(settings["plugin.minibits.t-function-jsx-hybrid-matcher"]),
}
