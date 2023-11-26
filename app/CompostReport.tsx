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
  toggleBinStatus,
  toggleMissingDryMatter,
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

export default function CompostReport() {
  const colorScheme = useColorScheme();
  const notes = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const formTouched = useAppSelector(selectFormTouched);
  const depositForm = useAppSelector(selectDepositForm);
  const router = useRouter();

  const onPressSend = (e: any) => {
    dispatch(sendDepositForm(userId))
      .unwrap()
      .then(({ data: transaction }) => {
        dispatch(incrementUserBalance(transaction.amount));
        dispatch(addUserTransaction(transaction));
        router.replace('/Home');
        dispatch(resetForm());
      });
  };

  const onPressSkip = (_e: any) => {
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
    <View style={styles.compostReport}>
      <Text style={{ fontSize: 40, padding: 12 }}>{i18n.t('compost_report_title')}</Text>
      <View style={styles.compostReport_form}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <CustomTag
            text={i18n.t('compost_report_bin_smells')}
            onPress={() => dispatch(toggleCompostSmell())}
            active={!!depositForm.compostSmell}
          />
          <CustomTag
            text={i18n.t('compost_report_bin_full')}
            onPress={() => dispatch(toggleBinStatus())}
            active={depositForm.binStatus === 'full'}
          />
        </View>
        <CustomTag
          text={i18n.t('compost_report_missing_dry_matter')}
          onPress={() => dispatch(toggleMissingDryMatter())}
          active={depositForm.dryMatter === 'no'}
        />
        <View>
          <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>
            {i18n.t('deposit_form_notes')}
          </Text>
          <TextInput
            value={notes}
            onChangeText={(e) => dispatch(setNotes(e))}
            style={{
              borderColor: Colors[colorScheme ?? 'light'].text,
              color: Colors[colorScheme ?? 'light'].text,
              ...styles.input,
            }}
          />
        </View>
        <View style={styles.buttons}>
          <CustomButton
            text={i18n.t('deposit_form_send')}
            onPress={onPressSend}
            disabled={!formTouched}
          />
          <CustomButton
            text={i18n.t('deposit_form_skip')}
            onPress={onPressSkip}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  compostReport: {
    height: '100%',
    alignContent: 'space-between',
    // justifyContent: 'stretch',
  },
  compostReport_form: {
    gap: 10,
    padding: 24,

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
