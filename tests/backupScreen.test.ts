import { it, expect } from "vitest";
import { parse } from "../src/ideExtension/messageReferenceMatchers.js";
import type { IPluginSettings } from "../src/settings.js";
let settings: IPluginSettings = {
	preferredTfuncName: "translate",
	recognizedTfuncNames: ["translate"],
	recognizedJSXAttributes: ["tx", "subTx"],
};
const sourceCode = `import { translate } from '../i18n'

export const BackupScreen = () => {
    const handleSpentByMintTaskResult = async (result) => {
        if (result && result.spentAmount > 0) {
            setInfo(
              translate("backupScreen.result", { proofCount: totalSpentCount, amount: totalSpentAmount })
            )
            return
        }
        setInfo(translate("noSpentEcashFound"))            
    }

    const toggleBackupSwitch = () => {
        if (result === true) { 
            setBackupResultMessage(translate("backupScreen.success"))
            return
        }
        setBackupResultMessage(translate("backupScreen.deletedSuccess"))
    }

    const increaseCounters = async function () {
        setInfo(translate("recoveryIndexesIncSuccess", { indCount: increaseAmount }))
    }

    return (
        <View>
            <ListItem
                tx="backupScreen.remoteBackup"
                subTx="backupScreen.remoteBackupDescription"
            />
            <ListItem
                tx="walletAddressRecovery"
                subTx="walletAddressRecoveryDesc"
            />
            <ListItem
                tx="backupScreen.localBackup"
                subTx="backupScreen.localBackupDescription"
            />
            <ListItem
                tx="backupScreen.recoveryTool"
                subTx="backupScreen.recoveryToolDescription"
            />
            <ListItem
                tx="backupScreen.removeSpentCoins"
                subTx="backupScreen.removeSpentCoinsDescription"
            />
            <ListItem
                tx="increaseRecoveryIndexes"
                subTx="increaseRecoveryIndexesDesc"
            />
            <ResultModalInfo
                title={translate(isLocalBackupOn ? 'localBackupEnabled' : 'localBackupDisabled')}
            />
        </View>
    )
}
`
it("should detect backupscreen tx and subTx keys properly", async () => {
	const matches = parse(sourceCode, settings);
	
	expect(matches).toHaveLength(17);
	
	// Function calls with translate()
	expect(matches[0]).toEqual({
		messageId: "backupScreen.result",
		position: {
			start: { line: 7, character: 26 },
			end: { line: 7, character: 46 }
		}
	});
	
	expect(matches[1]).toEqual({
		messageId: "noSpentEcashFound",
		position: {
			start: { line: 11, character: 28 },
			end: { line: 11, character: 46 }
		}
	});
	
	expect(matches[2]).toEqual({
		messageId: "backupScreen.success",
		position: {
			start: { line: 16, character: 47 },
			end: { line: 16, character: 68 }
		}
	});
	
	expect(matches[3]).toEqual({
		messageId: "backupScreen.deletedSuccess",
		position: {
			start: { line: 19, character: 43 },
			end: { line: 19, character: 71 }
		}
	});
	
	expect(matches[4]).toEqual({
		messageId: "recoveryIndexesIncSuccess",
		position: {
			start: { line: 23, character: 28 },
			end: { line: 23, character: 54 }
		}
	});
	
	// JSX attributes - tx and subTx
	expect(matches[5]).toEqual({
		messageId: "backupScreen.remoteBackup",
		position: {
			start: { line: 29, character: 21 },
			end: { line: 29, character: 47 }
		}
	});
	
	expect(matches[6]).toEqual({
		messageId: "backupScreen.remoteBackupDescription",
		position: {
			start: { line: 30, character: 24 },
			end: { line: 30, character: 61 }
		}
	});
	
	expect(matches[7]).toEqual({
		messageId: "walletAddressRecovery",
		position: {
			start: { line: 33, character: 21 },
			end: { line: 33, character: 43 }
		}
	});
	
	expect(matches[8]).toEqual({
		messageId: "walletAddressRecoveryDesc",
		position: {
			start: { line: 34, character: 24 },
			end: { line: 34, character: 50 }
		}
	});
	
	expect(matches[9]).toEqual({
		messageId: "backupScreen.localBackup",
		position: {
			start: { line: 37, character: 21 },
			end: { line: 37, character: 46 }
		}
	});
	
	expect(matches[10]).toEqual({
		messageId: "backupScreen.localBackupDescription",
		position: {
			start: { line: 38, character: 24 },
			end: { line: 38, character: 60 }
		}
	});
	
	expect(matches[11]).toEqual({
		messageId: "backupScreen.recoveryTool",
		position: {
			start: { line: 41, character: 21 },
			end: { line: 41, character: 47 }
		}
	});
	
	expect(matches[12]).toEqual({
		messageId: "backupScreen.recoveryToolDescription",
		position: {
			start: { line: 42, character: 24 },
			end: { line: 42, character: 61 }
		}
	});
	
	expect(matches[13]).toEqual({
		messageId: "backupScreen.removeSpentCoins",
		position: {
			start: { line: 45, character: 21 },
			end: { line: 45, character: 51 }
		}
	});
	
	expect(matches[14]).toEqual({
		messageId: "backupScreen.removeSpentCoinsDescription",
		position: {
			start: { line: 46, character: 24 },
			end: { line: 46, character: 65 }
		}
	});
	
	expect(matches[15]).toEqual({
		messageId: "increaseRecoveryIndexes",
		position: {
			start: { line: 49, character: 21 },
			end: { line: 49, character: 45 }
		}
	});
	
	expect(matches[16]).toEqual({
		messageId: "increaseRecoveryIndexesDesc",
		position: {
			start: { line: 50, character: 24 },
			end: { line: 50, character: 52 }
		}
	});
});