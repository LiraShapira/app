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
  toggleCompostSmell,
  selectDepositForm,
  toggleMissingDryMatter,
  toggleScalesMissing,
  toggleCompostFull,
  toggleCleanAndTidy,
  toggleBugs,
  sendSkippedDepositForm,
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
import { useState } from 'react';
import { setAppLoading, setIsModalVisible, setModalText } from '../store/appStateSlice';

export default function CompostReport() {
  const colorScheme = useColorScheme() ?? 'light';
  const notes = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const depositForm = useAppSelector(selectDepositForm);
  const router = useRouter();
  const [isTouched, setIsTouched] = useState(false);

  const onPressSend = () => {
    dispatch(setAppLoading(true));
    dispatch(sendDepositForm(userId))
      .unwrap()
      .then(({ data: transactions }) => {
        transactions.forEach((transaction) => {
          console.log('Transaction received:', transaction);
          console.log('Transaction amount:', transaction.amount, 'Type:', typeof transaction.amount);
          if (transaction.recipientId === userId) {
            console.log('Incrementing balance by:', transaction.amount);
            dispatch(incrementUserBalance(transaction.amount));
          }
          dispatch(addUserTransaction(transaction));
        });
        dispatch(resetForm());
      })
      .catch(e => {
        console.error("Error sending deposit form:", e);
        dispatch(setModalText(e.message));
        dispatch(setIsModalVisible(true));
      })
      .finally(() => {
        router.replace('/Home');
        dispatch(setAppLoading(false));
      });
  };

  const onPressSkip = () => {
    dispatch(setAppLoading(true));
    dispatch(sendSkippedDepositForm(userId))
      .unwrap()
      .then(({ data: transactions }) => {
        transactions.forEach((transaction) => {
          if (transaction.recipientId === userId) {
            dispatch(incrementUserBalance(transaction.amount));
          }
          dispatch(addUserTransaction(transaction));
        })
      })
      .catch(e => {
        console.error("Error sending deposit form:", e);
        dispatch(setModalText(e.message));
        dispatch(setIsModalVisible(true));
      })
      .finally(() => {
        dispatch(resetForm());
        router.replace('/Home');
        dispatch(setAppLoading(false));
      });;
  };

  const onChangeForm = (func: () => any) => {
    setIsTouched(true);
    dispatch(func());
  };

  return (
    <GradientContainer styles={styles.compostReport}>
      <Text
        style={{ color: Colors[colorScheme].text, fontSize: 40, padding: 12 }}
      >
        {i18n.t('compost_report_title')}
      </Text>
      <View style={styles.compostReport_form}>
        <View style={styles.tagsContainer}>
          <CustomTag
            text={i18n.t('compost_report_bin_smells')}
            onPress={() => onChangeForm(toggleCompostSmell)}
            active={!!depositForm.compostSmell}
          />
          <CustomTag
            text={i18n.t('compost_report_missing_dry_matter')}
            onPress={() => onChangeForm(toggleMissingDryMatter)}
            active={!!depositForm.missingDryMatter}
          />
          <CustomTag
            text={i18n.t('compost_report_missing_scales')}
            onPress={() => onChangeForm(toggleScalesMissing)}
            active={!!depositForm.scalesMissing}
          />
          <CustomTag
            text={i18n.t('compost_report_missing_bad_bugs')}
            onPress={() => onChangeForm(toggleBugs)}
            active={!!depositForm.bugs}
          />
          <CustomTag
            text={i18n.t('compost_report_bin_full')}
            onPress={() => onChangeForm(toggleCompostFull)}
            active={!!depositForm.compostFull}
          />
          <CustomTag
            text={i18n.t('compost_report_missing_clean_and_tidy')}
            onPress={() => onChangeForm(toggleCleanAndTidy)}
            active={!!depositForm.cleanAndTidy}
          />
        </View>
        <View>
          <Text style={{ color: Colors[colorScheme].text }}>
            {i18n.t('deposit_form_notes')}
          </Text>
          <TextInput
            value={notes}
            onChangeText={(e) => {
              setIsTouched(true);
              dispatch(setNotes(e));
            }}
            style={{
              borderColor: Colors[colorScheme].text,
              color: Colors[colorScheme].text,
              ...styles.input,
            }}
          />
        </View>
        <View style={styles.buttons}>
          <CustomButton
            disabled={!isTouched}
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
    flexWrap: 'wrap',
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
