import {
  StyleSheet,
  View,
  TextInput,
  Text,
  useColorScheme,
} from 'react-native';
import {
  setNotes,
  selectNotes,
  resetForm,
  sendDepositForm,
  resetOptionalProperties,
  selectFormTouched,
  toggleCompostSmell,
  selectDepositForm,
  toggleMissingDryMatter,
  toggleScalesMissing,
  toggleCompostFull,
  toggleCleanAndTidy,
  toggleBugs,
} from '../store/depositFormSlice';
import i18n from '../translationService';
import CustomButton from '../components/utils/CustomButton';
import { useAppSelector, useAppDispatch } from '../hooks';
import Colors from '../constants/Colors';
import {
  addUserTransaction,
  incrementUserBalance,
  selectUserId,
} from '../store/userSlice';
import { useRouter } from 'expo-router';
import CustomTag from '../components/utils/CustomTag';
import GradientContainer from '../components/utils/GradientContainer';

export default function CompostReport() {
  const colorScheme = useColorScheme() ?? 'light';
  const notes = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const depositForm = useAppSelector(selectDepositForm);
  const router = useRouter();

  const onPressSend = () => {
    dispatch(sendDepositForm(userId))
      .unwrap()
      .then(({ data: transaction }) => {
        dispatch(incrementUserBalance(transaction.amount));
        dispatch(addUserTransaction(transaction));
        router.replace('/Home');
        dispatch(resetForm());
      });
  };

  const onPressSkip = () => {
    dispatch(resetOptionalProperties());
    dispatch(sendDepositForm(userId))
      .unwrap()
      .then(({ data: transaction }) => {
        dispatch(incrementUserBalance(transaction.amount));
        dispatch(addUserTransaction(transaction));
        router.replace('/Home');
        dispatch(resetForm());
      });
  };

  return (
    <GradientContainer styles={styles.compostReport}>
      <Text style={{ color: Colors[colorScheme].text, fontSize: 40, padding: 12 }}>
        {i18n.t('compost_report_title')}
      </Text>
      <View style={styles.compostReport_form}>
        <View style={styles.tagsContainer}>
          <CustomTag
            text={i18n.t('compost_report_bin_smells')}
            onPress={() => dispatch(toggleCompostSmell())}
            active={!!depositForm.compostSmell}
          />
          <CustomTag
            text={i18n.t('compost_report_missing_dry_matter')}
            onPress={() => dispatch(toggleMissingDryMatter())}
            active={depositForm.dryMatter === 'no'}
          />
          <CustomTag
            text={i18n.t('compost_report_missing_scales')}
            onPress={() => dispatch(toggleScalesMissing())}
            active={!!depositForm.scalesMissing}
            />
          <CustomTag
            text={i18n.t('compost_report_missing_bad_bugs')}
            onPress={() => dispatch(toggleBugs())}
            active={!!depositForm.bugs}
            />
          <CustomTag
            text={i18n.t('compost_report_bin_full')}
            onPress={() => dispatch(toggleCompostFull())}
            active={!!depositForm.compostFull}
            />
          <CustomTag
            text={i18n.t('compost_report_missing_clean_and_tidy')}
            onPress={() => dispatch(toggleCleanAndTidy())}
            active={!!depositForm.cleanAndTidy}
            />
            </View>
        <View>
          <Text style={{ color: Colors[colorScheme].text }}>
            {i18n.t('deposit_form_notes')}
          </Text>
          <TextInput
            value={notes}
            onChangeText={(e) => dispatch(setNotes(e))}
            style={{
              borderColor: Colors[colorScheme].text,
              color: Colors[colorScheme].text,
              ...styles.input,
            }}
          />
        </View>
        <View style={styles.buttons}>
          <CustomButton
            text={i18n.t('deposit_form_send')}
            onPress={onPressSend}
          />
          <CustomButton
            text={i18n.t('deposit_form_skip')}
            onPress={onPressSkip}
          />
        </View>
      </View>
    </GradientContainer>
  );
}

const styles = StyleSheet.create({
  compostReport: {
    height: '100%',
    alignContent: 'space-between',
  },
  compostReport_form: {
    gap: 10,
    padding: 24,
  },
  tagsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  input: {
    height: 80,
    textAlignVertical: 'top',
    textAlign: 'left',
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderStyle: 'solid',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
