import {
  StyleSheet,
  View,
  TextInput,
  Text,
  useColorScheme,
  Alert,
  InteractionManager,
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
  selectDepositFormLoading,
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
import { setAppLoading } from '../store/appStateSlice';
import { Transaction } from '../types/Transaction';
import { depositLogger } from '../utils/depositLogger';
import { AppDispatch } from '../store';
import { Router } from 'expo-router';

const applyDepositTransactions = (
  transactions: Transaction[],
  userId: string,
  dispatch: AppDispatch,
) => {
  transactions.forEach((transaction) => {
    const amount = Number(transaction.amount);
    const safeAmount = Number.isFinite(amount) ? amount : 0;

    if (transaction.recipientId === userId && safeAmount !== 0) {
      dispatch(incrementUserBalance(safeAmount));
    }

    dispatch(
      addUserTransaction({
        ...transaction,
        amount: safeAmount,
        users: Array.isArray(transaction.users) ? transaction.users : [],
      }),
    );
  });
};

const finishDepositFlow = (dispatch: AppDispatch, router: Router) => {
  dispatch(setAppLoading(false));
  depositLogger.step('loading_dismissed').then(() => {
    InteractionManager.runAfterInteractions(() => {
      depositLogger.step('navigating_home').then(() => {
        router.replace('/Home');
      });
    });
  });
};

export default function CompostReport() {
  const colorScheme = useColorScheme() ?? 'light';
  const notes = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const depositForm = useAppSelector(selectDepositForm);
  const isSubmitting = useAppSelector(selectDepositFormLoading);
  const router = useRouter();
  const [isTouched, setIsTouched] = useState(false);

  const submitDeposit = async (skippedReport: boolean) => {
    if (isSubmitting) {
      return;
    }

    dispatch(setAppLoading(true));
    await depositLogger.step('submit_started', { skippedReport });

    const action = skippedReport
      ? sendSkippedDepositForm(userId)
      : sendDepositForm(userId);

    try {
      const { data: transactions } = await dispatch(action).unwrap();

      if (!Array.isArray(transactions)) {
        throw new Error('Server returned an unexpected deposit response');
      }

      applyDepositTransactions(transactions, userId, dispatch);
      await depositLogger.step('transactions_applied', {
        transactionCount: transactions.length,
        skippedReport,
      });

      dispatch(resetForm());
      await depositLogger.step('form_reset', { skippedReport });
      await depositLogger.step('submit_complete', { skippedReport });
      await depositLogger.clear();
      finishDepositFlow(dispatch, router);
    } catch (e: any) {
      const errorMessage = e?.message ?? 'Deposit failed';
      console.error('Error sending deposit form:', e);
      await depositLogger.step('submit_failed', {
        error: errorMessage,
        skippedReport,
      });

      dispatch(setAppLoading(false));
      Alert.alert(i18n.t('deposit'), errorMessage);
    }
  };

  const onPressSend = () => {
    submitDeposit(false);
  };

  const onPressSkip = () => {
    submitDeposit(true);
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
            disabled={!isTouched || isSubmitting}
            text={i18n.t('deposit_form_send')}
            onPress={onPressSend}
          />
          <CustomButton
            disabled={isSubmitting}
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
