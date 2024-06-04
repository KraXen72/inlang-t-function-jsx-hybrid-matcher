import { Type, type Static } from '@sinclair/typebox'


export const PluginSettings = Type.Object({
	preferredTfuncName: Type.Optional(Type.String({
		title: "Preferred t-function name",
		description: 'The t("key") function name to use when extracting a new string.',
		default: "t",
		examples: ["t", "translate", "i18n.t"]
	})),
	recognizedTfuncNames: Type.Optional(Type.Array(Type.String(), {
		title: "Recognized t-function names",
		description: 'Array of recognized t("key") function names (to show inline previews of messages)',
		default: ["t"],
		examples: ["t", "translate", "i18n.t"]
	})),
	recognizedJSXAttributes: Type.Optional(Type.Array(Type.String(), {
		title: "Recognized JSX attributes",
		description: "which JSX attributes should be recognized as translate ones",
		default: [],
		examples: ["tx", "subTx"]
	}))
})
export type PluginSettings = Static<typeof PluginSettings>

// export const PluginSettings = {}
// export type PluginSettings = {}

