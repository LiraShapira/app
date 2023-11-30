import {
  View,
  StyleSheet,
  Text,
  useColorScheme,
  TextInput,
} from 'react-native';
import Colors from '../../constants/Colors';
import i18n from '../../translationService';
import DepositFormSwitch from '../../components/form/DepositFormSwitch';
import NumberInput from '../../components/form/NumberInput';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  resetForm,
  selectNotes,
  selectValue,
  sendDepositForm,
  setBinStatus,
  setCompostDryMatter,
  setCompostSmell,
  setCompostStand,
  setNotes,
} from '../../store/depositFormSlice';
import {
  addUserTransaction,
  incrementUserBalance,
  selectUserId,
} from '../../store/userSlice';
import CustomButton from '../../components/utils/CustomButton';
import { setIsModalVisible, setModalText } from '../../store/appStateSlice';
import { CompostStand, DepositForm } from '../../types/Deposit';
import { useRouter } from 'expo-router';
import { getItem } from '../../utils/asyncStorage';
import { StorageKeys } from '../../types/AsyncStorage';

export default function Deposit() {
  const colorScheme = useColorScheme();
  const userId = useAppSelector(selectUserId);
  const value = useAppSelector(selectValue);
  const notes = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onPressSend = async (e: any) => {
    // send form
    const usersCompostStand = await getItem(StorageKeys.compostStand) as CompostStand
    usersCompostStand && dispatch(setCompostStand(usersCompostStand));

    dispatch(sendDepositForm(userId))
      .unwrap()
      .then(({ data: transaction }) => {
        dispatch(incrementUserBalance(transaction.amount));
        dispatch(addUserTransaction(transaction));
        router.push('/Home');
      })
      .catch((e) => {
        dispatch(setModalText(e.message));
        dispatch(setIsModalVisible(true));
      });
    dispatch(resetForm());
  };

  const onPressSkip = (e: any) => {
    // send empty form
  };

  return (
    <View style={{ height: '100%', padding: 8 }}>
      <Text
        style={{
          fontSize: 40,
          paddingVertical: 16,
          color: Colors[colorScheme ?? 'light'].text,
        }}
      >
        {i18n.t('deposit_title')}
      </Text>
      <View style={styles.depositSwitches}>
        <View style={styles.amount}>
          <Text
            style={{
              color: Colors[colorScheme ?? 'light'].text,
              fontSize: 18,
              ...styles.amountLabel,
            }}
          >
            { i18n.t('deposit_form_amount') }
          </Text>
          <NumberInput style={styles.amountInput} />
        </View>
        <View>
        </View>
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
            disabled={!value}
          />
          {/* <CustomButton
            text={i18n.t('deposit_form_skip')}
            onPress={() => console.log('skip')}
          /> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  depositSwitchContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  amount: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'stretch',
  },
  amountLabel: { flex: 1 },
  amountInput: { flex: 1 },
  input: {
    height: 120,
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
