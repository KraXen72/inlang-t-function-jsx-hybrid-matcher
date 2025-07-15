import { it, expect } from "vitest";
import { parse } from "../src/ideExtension/messageReferenceMatchers.js";
import type { IPluginSettings } from "../src/settings.js";

let settings: IPluginSettings = {
	preferredTfuncName: "t",
	recognizedTfuncNames: ["t", "translate"],
	recognizedJSXAttributes: ["tx", "subTx"],
};

// DO NOT REFORMAT THIS FILE
// IT WILL BREAK THE TESTS

// jsx stuff
it("should detect a tx attribute in a JSX element", async () => {
	const sourceCode = `
		const Custom404 = () => {
			return (
				<Text 
					className="flex h-screen items-center justify-center"
					tx="notFound.title"
				>
					<Image
						src="/icons/warning.svg"
						height={25}
						width={25}
					/>
				</Text>
			)
		};
		`;
	const matches = parse(sourceCode, settings);
	expect(matches).toHaveLength(1);
	expect(matches[0]?.bundleId).toBe("notFound.title");
});

it("should detect a subTx attribute in a JSX element", async () => {
	const sourceCode = `
		const HeaderWithDesc = () => {
			return (
				<Header 
					className="flex h-screen items-center justify-center"
					subTx="wallet.description"   
				>
					<Text text="ayuka" />
				</Header>
			)
		};
		`;
	const matches = parse(sourceCode, settings);
	expect(matches).toHaveLength(1);
	expect(matches[0]?.bundleId).toBe("wallet.description");
});

it("should detect multiple attributes in nested JSX elements", async () => {
	const sourceCode = `
		const ListItemLocalBackup = () => {
			return (
				<ListItem
					tx="backupScreen.localBackup"
					subTx="backupScreen.localBackupDescription"
					leftIcon='faDownload'
					leftIconColor={
						isLocalBackupOn
							? colors.palette.success200
							: colors.palette.neutral400
					}
					leftIconInverse={true}
					RightComponent={
						<View style={$rightContainer}>
							<Text
								size="sm"
								tx="payCommon.amountToPayLabel"
								style={{color: 'white', textAlign: 'center'}}
							/>
						</View>
					}
					style={$item}
				/>
			)
		};
		`;
	const matches = parse(sourceCode, settings);
	expect(matches).toHaveLength(3);
	expect(matches[0]?.bundleId).toBe("backupScreen.localBackup");
	expect(matches[1]?.bundleId).toBe("backupScreen.localBackupDescription");
	expect(matches[2]?.bundleId).toBe("payCommon.amountToPayLabel");
});

it("should detect bracket-wrapped string attributes in JSX", async () => {
	const sourceCode = `
		{
			!encodedInvoice &&
				transactionStatus !== TransactionStatus.COMPLETED &&
				lnurlPayCommentAllowed > 0 && (
					<>
						<MemoInputCard
							memo={lnurlPayComment}
							setMemo={setLnurlPayComment}
							ref={lnurlCommentInputRef}
							onMemoDone={() => false}
							onMemoEndEditing={() => false}
							disabled={encodedInvoice ? true : false}
							maxLength={lnurlPayCommentAllowed}
						/>
						<View style={$bottomContainer}>
							<View style={$buttonContainer}>
								<Button
									tx={"transferScreen.requestInvoice"}
									onPress={onRequestLnurlInvoice}
								/>
							</View>
						</View>
					</>
				);
		}`;

	const matches = parse(sourceCode, settings);
	expect(matches).toHaveLength(1);
	expect(matches[0]?.bundleId).toBe("transferScreen.requestInvoice");
});

// Duplicate t-function tests removed - see messageReferenceMatchers.test.ts for comprehensive t-function testing

it("should detect multiple translate function calls", async () => {
	const sourceCode = `
		const toggleBackupSwitch = () => {
      try {
        setIsLoading(true)
        const result = userSettingsStore.setIsLocalBackupOn(!isLocalBackupOn)
        setIsLocalBackupOn(result)

        if (result === true) { 
                    
          log.trace('[toggleBackupSwitch]', JSON.stringify(proofsStore.getBalances()))
          
          if(proofsStore.allProofs.length > 0){
            log.trace('[toggleBackupSwitch]', JSON.stringify(proofsStore.allProofs))
            Database.addOrUpdateProofs(proofsStore.allProofs)
          }
          if(proofsStore.allPendingProofs.length > 0){
            Database.addOrUpdateProofs(proofsStore.allPendingProofs, true)
          }

          setBackupResultMessage(translate("backupScreen.success"))
          toggleBackupModal()
          setIsLoading(false)
          return
        }

        Database.removeAllProofs()
        setIsLoading(false)
        setBackupResultMessage(translate("backupScreen.deletedSuccess"))
        toggleBackupModal()
      } catch (e: any) {
        handleError(e)
      }
    }
	`
	const matches = parse(sourceCode, settings)
	expect(matches).toHaveLength(2)
	expect(matches[0]?.bundleId).toBe("backupScreen.success")
	expect(matches[1]?.bundleId).toBe("backupScreen.deletedSuccess")
})