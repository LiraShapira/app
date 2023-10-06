import {
  StyleSheet,
  View,
  TextInput,
  Text,
  useColorScheme,
} from 'react-native';
import {
  setBinStatus,
  setCompostSmell,
  setCompostDryMatter,
  setNotes,
  selectNotes,
  resetForm,
  sendDepositForm,
  resetOptionalProperties,
  selectFormTouched,
} from '../store/depositFormSlice';
import i18n from '../translationService';
import DepositFormSwitch from '../components/form/DepositFormSwitch';
import CustomButton from '../components/utils/CustomButton';
import { useAppSelector, useAppDispatch } from '../hooks';
import Colors from '../constants/Colors';
import {
  addUserTransaction,
  incrementUserBalance,
  selectUserId,
} from '../store/userSlice';
import { useRouter } from 'expo-router';

export default function CompostReport() {
  const colorScheme = useColorScheme();
  const notes = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const formTouched = useAppSelector(selectFormTouched);
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
    dispatch(resetOptionalProperties())
    dispatch(sendDepositForm(userId))
    .unwrap()
    .then(({ data: transaction }) => {
      dispatch(incrementUserBalance(transaction.amount));
      dispatch(addUserTransaction(transaction));
      router.replace('/Home');
      dispatch(resetForm());
    });
  }

  return (
    <View style={styles.compostReport}>
      <DepositFormSwitch
        onPress={(v: DepositForm['binStatus']) => dispatch(setBinStatus(v))}
        title={i18n.t('deposit_form_bin_status')}
        switchLabels={[
          i18n.t('deposit_form_bin_status_full'),
          i18n.t('deposit_form_bin_status_empty'),
        ]}
        optionValues={[true, false]}
      />
      <DepositFormSwitch
        onPress={(v: DepositForm['compostSmell']) =>
          dispatch(setCompostSmell(v))
        }
        title={i18n.t('deposit_form_bin_status_smell')}
        optionValues={[false, true]}
        switchLabels={[i18n.t('no'), i18n.t('yes')]}
      />
      <DepositFormSwitch
        onPress={(v: DepositForm['dryMatter']) =>
          dispatch(setCompostDryMatter(v))
        }
        title={i18n.t('deposit_form_dry_matter')}
        optionValues={['no', 'some', 'yes']}
        switchLabels={[i18n.t('no'), i18n.t('some'), i18n.t('yes')]}
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
  );
}

const styles = StyleSheet.create({
  compostReport: {
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    alignContent: 'space-between',
    height: '100%',
    gap: 10,
    padding: 24,
  },
  depositSwitches: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: '80%',
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
  submitButton: {
    borderRadius: 200,
    width: '40%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
