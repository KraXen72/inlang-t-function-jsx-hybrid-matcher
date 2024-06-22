import { it, expect } from "vitest";
import { parse } from "../src/ideExtension/messageReferenceMatchers.js";
import type { PluginSettings } from "../src/settings.js";

let settings: PluginSettings = {
	preferredTfuncName: "translate",
	recognizedTfuncNames: ["translate"],
	recognizedJSXAttributes: ["tx", "subTx"],
};

const sourceCode = `
export const BackupScreen: FC<SettingsStackScreenProps<'Backup'>> = observer(function BackupScreen(_props) {
    const {navigation} = _props
    useHeader({
        leftIcon: 'faArrowLeft',
        onLeftPress: () => navigation.goBack(),
    })

    const {userSettingsStore, proofsStore, mintsStore} = useStores()

    const [isLoading, setIsLoading] = useState(false)
    const [isLocalBackupOn, setIsLocalBackupOn] = useState<boolean>(
      userSettingsStore.isLocalBackupOn,
    )
    const [error, setError] = useState<AppError | undefined>()
    const [info, setInfo] = useState('')
    const [isBackupModalVisible, setIsBackupModalVisible] =
      useState<boolean>(false)
    const [isHandleSpentFromSpendableSentToQueue, setIsHandleSpentFromSpendableSentToQueue] = useState<boolean>(false)
    const [backupResultMessage, setBackupResultMessage] = useState<string>()
    const [totalSpentCount, setTotalSpentCount] = useState<number>(0)
    const [totalSpentAmount, setTotalSpentAmount] = useState<number>(0)


    useEffect(() => {
        const handleSpentByMintTaskResult = async (result: WalletTaskResult) => {
            log.warn('handleSpentByMintTaskResult event handler triggered')

            if (!isHandleSpentFromSpendableSentToQueue) { return false }
            
            setIsLoading(false)            
            // runs per each mint
            if (result && result.spentAmount > 0) {
                setTotalSpentAmount(prev => prev + result.spentAmount)
                setTotalSpentCount(prev => prev + result.spentCount)
                setInfo(
                  translate("backupScreen.result", { proofCount: totalSpentCount, amount: totalSpentAmount })
                )
                return
            }
          setInfo(translate("noSpentEcashFound"))            
        }
        
        EventEmitter.on('ev__handleSpentByMintTask_result', handleSpentByMintTaskResult)
        
        return () => {
            EventEmitter.off('ev__handleSpentByMintTask_result', handleSpentByMintTaskResult)            
        }
    }, [isHandleSpentFromSpendableSentToQueue])

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

    const toggleBackupModal = () =>
      setIsBackupModalVisible(previousState => !previousState)

    const gotoLocalRecovery = function () {
      navigation.navigate('LocalRecovery')
    }

    const gotoRemoteBackup = function () {
        navigation.navigate('RemoteBackup')
    }

    const gotoRemoteRecovery = function () {
      navigation.navigate('RemoteRecovery', {isAddressOnlyRecovery: true})
    }

    const checkSpent = async function () {
      setIsLoading(true)
      setIsHandleSpentFromSpendableSentToQueue(true)
      WalletTask.handleSpentFromSpendable()      
    }


    const increaseCounters = async function () {
      const increaseAmount = 50
      for (const mint of mintsStore.allMints) {
        for(const counter of mint.proofsCounters) {
          mint.increaseProofsCounter(counter.keyset, increaseAmount)
        }            
      }  
      setInfo(translate("recoveryIndexesIncSuccess", { indCount: increaseAmount }))
    }


    const handleError = function (e: AppError): void {
      setIsLoading(false)
      setError(e)
    }

    const headerBg = useThemeColor('header')

    return (
      <Screen preset='auto' style={$screen}>
        <View style={[$headerContainer, {backgroundColor: headerBg}]}>
          <Text preset="heading" text="Backup" style={{color: 'white'}} />
        </View>
        <View style={$contentContainer}>
            <Card
                style={$card}
                HeadingComponent={
                <>                
                  <ListItem
                    tx="backupScreen.remoteBackup"
                    subTx="backupScreen.remoteBackupDescription"
                    leftIcon='faUpRightFromSquare'
                    leftIconColor={colors.palette.blue200}
                    leftIconInverse={true}
                    style={$item}
                    onPress={gotoRemoteBackup}
                    bottomSeparator={true}
                  />
                  <ListItem
                    tx="walletAddressRecovery"
                    subTx="walletAddressRecoveryDesc"
                    leftIcon='faCircleUser'
                    leftIconColor={colors.palette.iconGreyBlue400}
                    leftIconInverse={true}
                    style={$item}
                    onPress={gotoRemoteRecovery}
                  />
                </>
                }
            />
            <Card
                style={$card}
                HeadingComponent={
                <>
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
                        <Switch
                            onValueChange={toggleBackupSwitch}
                            value={isLocalBackupOn}
                        />
                        </View>
                    }
                    style={$item}
                    />
                    {isLocalBackupOn && (
                    <ListItem
                        tx="backupScreen.recoveryTool"
                        subTx="backupScreen.recoveryToolDescription"
                        leftIcon='faUpload'
                        leftIconColor={colors.palette.focus300}
                        leftIconInverse={true}
                        style={$item}
                        onPress={gotoLocalRecovery}
                        topSeparator={true}
                    />
                    )}                
                </>
                }
            />
            <Card
                style={$card}
                HeadingComponent={
                <>                
                    <ListItem
                        tx="backupScreen.removeSpentCoins"
                        subTx="backupScreen.removeSpentCoinsDescription"
                        leftIcon='faRecycle'
                        leftIconColor={colors.palette.secondary300}
                        leftIconInverse={true}
                        RightComponent={
                            <View style={$rightContainer}>
                                <Button
                                    onPress={checkSpent}
                                    text='Remove'
                                    preset='secondary'                                           
                                /> 
                            </View>                           
                        }
                        style={$item}                        
                    />                    
                </>
                }
            /> 
            <Card
                style={$card}
                HeadingComponent={
                <>                
                    <ListItem
                        tx="increaseRecoveryIndexes"
                        subTx="increaseRecoveryIndexesDesc"
                        leftIcon='faArrowUp'
                        leftIconColor={colors.palette.success300}
                        leftIconInverse={true}
                        RightComponent={
                            <View style={$rightContainer}>
                                <Button
                                    onPress={increaseCounters}
                                    text='Increase'
                                    preset='secondary'                                           
                                /> 
                            </View>                           
                        } 
                        style={$item}                        
                    />
                </>
                }
            />       
        {isLoading && <Loading />}
        </View>
        <BottomModal
          isVisible={isBackupModalVisible}          
          style={{paddingHorizontal: spacing.small}}
          ContentComponent={
            <ResultModalInfo
              icon={'faDownload'}
              iconColor={
                isLocalBackupOn
                  ? colors.palette.success200
                  : colors.palette.neutral400
              }
              // title={
              //   isLocalBackupOn ? 'Local backup is on' : 'Local backup is off'
              // }
              title={translate(isLocalBackupOn ? 'localBackupEnabled' : 'localBackupDisabled')}
              message={backupResultMessage as string}
            />
          }
          onBackButtonPress={toggleBackupModal}
          onBackdropPress={toggleBackupModal}
        />
        {error && <ErrorModal error={error} />}
        {info && <InfoModal message={info} />}
      </Screen>
    )
  },
)
`
it("should detect backupscreen tx and subTx keys properly", async () => {
	const matches = parse(sourceCode, settings);
	const lines = sourceCode.split("\n");
	// it's broken here for the jsx - the ending is bad and slices don't work
	for (const match of matches) {
		const lineStart = match.position.start.line - 1;
		const lineEnd = match.position.end.line - 1;
		const slice = lines[lineStart].slice(match.position.start.character) + lines[lineEnd].slice(0, match.position.end.character);
		console.log(">", match.messageId, slice, match.position.start, match.position.end);
	}
	// expect(matches).toHaveLength(1);
	// expect(matches[0]?.messageId).toBe("notFound.title");
});