import { Plugin } from "@inlang/plugin"
import { PluginSettings } from "./settings.js"
import { ideExtensionConfig } from "./ideExtension/config.js"

import manifest from "../marketplace-manifest.json" with { type: "json" }
const { displayName, description } = manifest;

const id = "plugin.minibits.inlangmatcher"

export const plugin: Plugin<{
	[id]: PluginSettings
}> = {
	id,
	displayName,
	description,
	settingsSchema: PluginSettings,
	addCustomApi: ({ settings }) => ideExtensionConfig(settings["plugin.minibits.inlangmatcher"]),
}
