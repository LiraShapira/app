import {
  Text,
  TextInput,
  useColorScheme,
  View,
  StyleSheet,
} from 'react-native';
import i18n from '../translationService';
import Colors from '../constants/Colors';
import CustomButton from '../components/utils/CustomButton';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  saveTransaction,
  selectAmount,
  selectChosenUser,
  selectReason,
  setAmount,
  setReason,
  unsetChosenUser,
} from '../store/sendFormSlice';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setIsModalVisible, setModalText } from '../store/appStateSlice';
import {
  addUserTransaction,
  selectUser,
  selectUserId,
  setIsUserLoading,
  setUserBalance,
} from '../store/userSlice';
import { Category } from '../types/Transaction';
import { User } from '../types/User';
import { CustomModal } from '../components/utils/CustomModal';
import GradientContainer from '../components/utils/GradientContainer';
import SendFlowHeader from '../components/utils/StepsHeader';

export default function SendReason() {
  const colorScheme = useColorScheme();
  const [reasonError, setReasonError] = useState<boolean>(true);
  const router = useRouter();
  const currentUser = useAppSelector<User>(selectUser);
  const chosenUser = useAppSelector<User | undefined>(selectChosenUser);
  const amount = useAppSelector<number>(selectAmount);
  const reason = useAppSelector<string>(selectReason);
  const currentUserId = useAppSelector<string>(selectUserId);
  const dispatch = useAppDispatch();
  const params = useLocalSearchParams();
  const { isRequest } = params;

  const onPressSend = async () => {
    try {
      dispatch(setIsUserLoading(true));
      if (!chosenUser?.phoneNumber) {
        throw new Error("Selected user is missing a phone number");
      }
      if (!isRequest && (
        currentUser?.accountBalance <= 0 ||
        amount > currentUser?.accountBalance
      )
      ) {
        throw new Error(i18n.t('sendamount_not_enough_funds'));
      }

      if (chosenUser.id === currentUser.id) {
        throw new Error('Cannot send or make request to yourself');
      }

      const newTransaction = {
        recipientPhoneNumber: isRequest
          ? currentUser.phoneNumber
          : chosenUser.phoneNumber,
        amount: amount,
        category: Category.MISC,
        reason: reason,
        purchaserId: isRequest ? chosenUser.id : currentUserId,
        isRequest: isRequest === 'true' || isRequest === true,
        ...(currentUser.communityId && { communityId: currentUser.communityId }),
      };
      const { data: transaction } = await dispatch(
        saveTransaction(newTransaction)
      ).unwrap();
      dispatch(addUserTransaction(transaction));
      if (!isRequest) {
        const updatedBalance = currentUser.accountBalance - amount;
        dispatch(setUserBalance(updatedBalance));
      }
      dispatch(setAmount(0));
      dispatch(setReason(''));
      dispatch(setIsUserLoading(false));
      router.push('/Home');
    } catch (e) {
      console.error('Transaction error:', e);
      const errorMessage =
        e instanceof Error ? e.message : i18n.t('generic_error');
      dispatch(setModalText(errorMessage));
      dispatch(setIsUserLoading(false));
      dispatch(setIsModalVisible(true));
    }
  };

  const onChangeReason = (reason: string) => {
    if (!reason) {
      setReasonError(true);
      dispatch(setReason(reason));
      return;
    }
    setReasonError(false);
    dispatch(setReason(reason));
  };

  const onModalCancel = () => {
    dispatch(setAmount(0));
    dispatch(setReason(''));
    dispatch(setIsModalVisible(false));
    router.push('/Home');
  };
  const onModalChangeUser = () => {
    dispatch(setIsModalVisible(false));
    dispatch(unsetChosenUser());
    router.back();
  };

  return (
    <GradientContainer safeAreaStyle={{ flex: 1 }} styles={{ flex: 1 }}>
      <SendFlowHeader stage='reason' />
      <View style={styles.contentContainer}>
        <CustomModal
          type="error"
          buttons={[
            { text: i18n.t('cancel'), onPress: onModalCancel },
            { text: i18n.t('sendamount_back'), onPress: onModalChangeUser },
          ]}
        />
        <View style={styles.inputSection}>
          <Text
            style={{ fontSize: 24, color: Colors[colorScheme ?? 'light'].text }}
          >
            {i18n.t('sendamount_why')}
          </Text>
          <TextInput
            maxLength={15}
            style={{
              fontSize: 44,
              textAlign: 'center',
              color: Colors[colorScheme ?? 'light'].text,
              borderBottomColor: Colors[colorScheme ?? 'light'].text,
              borderBottomWidth: 1,
              width: '80%',
            }}
            onChangeText={onChangeReason}
            value={reason}
            inputMode="text"
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            disabled={!reason || reasonError}
            onPress={onPressSend}
            text={i18n.t('sendamount_continue')}
          />
          <CustomButton
            onPress={() => router.back()}
            text={i18n.t('sendamount_back')}
            transparent={true}
            textColor='white'
          />
        </View>
      </View>
    </GradientContainer>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 80, // Ensure buttons clear footer
  },
  inputSection: {
    marginTop: 60,
    alignItems: 'center',
    gap: 20,
  },
  buttonContainer: {
    marginTop: 'auto', // Pushes to bottom
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-around',
  },
});
