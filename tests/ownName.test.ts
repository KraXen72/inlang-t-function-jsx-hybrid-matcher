import { it, expect } from "vitest";
import { parse } from "../src/ideExtension/messageReferenceMatchers.js";
import type { PluginSettings } from "../src/settings.js";

let settings: PluginSettings = {
	preferredTfuncName: "translate",
	recognizedTfuncNames: ["translate"],
	recognizedJSXAttributes: ["tx", "headingTx", "footerTx"],
};


const sourceCode = `
<Card
	style={[$card, {marginTop: spacing.small}]}
									headingTx='contactsScreen.ownName.chooseOwnName'
	headingStyle={{textAlign: 'center'}}
	ContentComponent={                                
			<View style={$ownNameContainer}>
					<TextInput
							ref={ownNameInputRef}
							onChangeText={(name) => onOwnNameChange(name)}                        
							style={[$ownNameInput, {backgroundColor: inputBg, color: inputText}]}
							maxLength={16}
							keyboardType="default"
							selectTextOnFocus={true}                        
							autoCapitalize="none"
							// editable={isNameInputEnabled}
					/>
					<View style={[$ownNameDomain, { backgroundColor: inputBg}]}>
							<Text size='xxs' style={{color: domainText}} text={MINIBITS_NIP05_DOMAIN}/>
					</View>                 
					<Button
							preset="default"
							style={$ownNameButton}
							text="Check"
							onPress={onOwnNameCheck}
							// disabled={!isNameInputEnabled}
					/>                    
			</View>                
	}
	footerTx='contactsScreen.ownName.chooseOwnNameFooter'
	footerStyle={{color: hint, textAlign: 'center'}}                
/>
`

it("should highlight custom tx attrs from settings", () => {
	const matches = parse(sourceCode, settings);
	console.log(matches)
})