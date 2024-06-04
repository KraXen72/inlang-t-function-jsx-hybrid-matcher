import { Type, type Static } from '@sinclair/typebox'


export const PluginSettings = Type.Object({
	preferredTfuncName: Type.String({
		title: "Preferred t-function name",
		description: 'The t("key") function name to use when extracting a new string.',
		default: "t",
		examples: ["t", "translate", "i18n.t"]
	}),
	recognizedTfuncNames: Type.Array(Type.String(), {
		title: "Recognized t-function names",
		description: 'Array of recognized t("key") function names (to show inline previews of messages)',
		default: ["t"],
		examples: ["t", "translate", "i18n.t"]
	})
})

export type IPluginSettings = Static<typeof PluginSettings>
