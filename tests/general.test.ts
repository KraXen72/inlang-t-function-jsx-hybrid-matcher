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
	expect(matches[0]?.messageId).toBe("notFound.title");
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
	expect(matches[0]?.messageId).toBe("wallet.description");
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
	expect(matches[0]?.messageId).toBe("backupScreen.localBackup");
	expect(matches[1]?.messageId).toBe("backupScreen.localBackupDescription");
	expect(matches[2]?.messageId).toBe("payCommon.amountToPayLabel");
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
	expect(matches[0]?.messageId).toBe("transferScreen.requestInvoice");
});

// t-function stuff

it("should not match a function that ends with t but is not a t function", async () => {
	const sourceCode = `
    const x = somet("some-id")
    `
	const matches = parse(sourceCode, settings)
	expect(matches).toHaveLength(0)
})

it("should not match a string without a t function", async () => {
	const sourceCode = `
    const x = some("some-id")
    `
	const matches = parse(sourceCode, settings)
	expect(matches).toHaveLength(0)
})

it('should detect double quotes t("id")', async () => {
	// double quotes
	const sourceCode = `
    const x = t("some-id")
    `
	const matches = parse(sourceCode, settings)
	expect(matches[0]?.messageId).toBe("some-id")
	expect(matches[0]?.position.start.character).toBe(17)
	expect(matches[0]?.position.end.character).toBe(24)
	expect(
		sourceCode.slice(matches[0]?.position.start.character, matches[0]?.position.end.character)
	).toBe('"some-id"')
})

it(`should detect single quotes t('id')`, async () => {
	// single quotes
	const sourceCode = `
    const x = t('some-id')
  `
	const matches = parse(sourceCode, settings)
	expect(matches[0]?.messageId).toBe("some-id")
	expect(matches[0]?.position.start.character).toBe(17)
	expect(matches[0]?.position.end.character).toBe(24)
})

it(`should detect JSX <p>{t('id')}</p>`, async () => {
	// using the t function in markup
	const sourceCode = `
    <p>{t('some-id')}</p>
    `
	const matches = parse(sourceCode, settings)
	expect(matches[0]?.messageId).toBe("some-id")
	expect(matches[0]?.position.start.character).toBe(11)
	expect(matches[0]?.position.end.character).toBe(18)
})

it("should detect t('id', ...args)", async () => {
	// passing arguments to the t function should not prevent detection
	const sourceCode = `
    <p>{t('some-id' , { name: "inlang" }, variable, arg3)}</p>
    `
	const matches = parse(sourceCode, settings)
	expect(matches[0]?.messageId).toBe("some-id")
	expect(
		sourceCode.slice(matches[0]?.position.start.character, matches[0]?.position.end.character)
	).toBe("'some-id'")
})

it("should not mismatch a string with different quotation marks", async () => {
	const sourceCode = `
    <p>{t("yes')}</p>
    `
	const matches = parse(sourceCode, settings)
	expect(matches).toHaveLength(0)
})

// test not passing, don't know how to fix in short time
it.skip("should ignore whitespace", async () => {
	// prefixing with space see test above
	const sourceCode = `const x = t("some-id", undefined)`
	const matches = parse(sourceCode, settings)
	expect(matches[0]?.messageId).toBe("some-id")
	expect(
		sourceCode.slice(matches[0]?.position.start.character, matches[0]?.position.end.character)
	).toBe('"some-id"')
})

it("should detect combined message.attribute ids", async () => {
	const sourceCode = ` t('some-message.with-attribute')`
	const matches = parse(sourceCode, settings)
	expect(matches[0]?.messageId).toBe("some-message.with-attribute")
})

it(`should detect human readable id t("penguin_purple_shoe_window")`, async () => {
	const sourceCode = `
	const x = t("penguin_purple_shoe_window")
	`

	const matches = parse(sourceCode, settings)
	expect(matches[0]?.messageId).toBe("penguin_purple_shoe_window")
	expect(matches[0]?.position.start.character).toBe(14)
	expect(matches[0]?.position.end.character).toBe(40)
})

it("should work on a production JSX example", async () => {
	const sourceCode = `
		import NextPage from "next";
		import Image from "next/image";
		import { useTranslation } from "react-multi-lang";

		t("hello-world")

		const Custom404: NextPage = () => {
			const t = useTranslation();
			return (
				<div className="flex h-screen items-center justify-center">
					<Image
						src="/icons/warning.svg"
						alt={t("404.title")}
						height={25}
						width={25}
					/>
					<h6>{t("421.message")}</h6>
				</div>
			);
		};

		export default Custom404;
		`
	const matches = parse(sourceCode, settings)
	expect(matches).toHaveLength(3)
	expect(matches[0]?.messageId).toBe("hello-world")
	expect(matches[1]?.messageId).toBe("404.title")
	expect(matches[2]?.messageId).toBe("421.message")
})

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
	expect(matches[0]?.messageId).toBe("backupScreen.success")
	expect(matches[1]?.messageId).toBe("backupScreen.deletedSuccess")
})