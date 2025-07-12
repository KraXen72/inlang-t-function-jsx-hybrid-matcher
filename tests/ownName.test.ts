import { it, expect } from "vitest";
import { parse } from "../src/ideExtension/messageReferenceMatchers.js";
import type { IPluginSettings } from "../src/settings.js";
import { inspect } from "node:util";

let settings: IPluginSettings = {
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
	console.log(inspect(matches, { depth: null }));

	expect(matches).toHaveLength(2);
	expect(matches[0]).toEqual({
		messageId: 'contactsScreen.ownName.chooseOwnName',
		position: {
			start: { line: 4, character: 20 },
			end: { line: 4, character: 56 }
		}
	})
	expect(matches[1]).toEqual({
		messageId: 'contactsScreen.ownName.chooseOwnNameFooter',
		position: {
			start: { line: 30, character: 11 },
			end: { line: 30, character: 53 }
		}
	})
})