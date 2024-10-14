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
  selectChosenContact,
  selectReason,
  setAmount,
  setReason,
  unsetChosenContact,
} from '../store/sendFormSlice';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setIsModalVisible, setModalText } from '../store/appStateSlice';
import {
  addUserTransaction,
  getUserIdByNumber,
  selectUser,
  selectUserId,
  setIsUserLoading,
  setUserBalance,
} from '../store/userSlice';
import { Category } from '../types/Transaction';
import { parsePhoneNumber } from 'libphonenumber-js';
import { User } from '../types/User';
import { Contact } from 'expo-contacts';
import { CustomModal } from '../components/utils/CustomModal';

export default function SendReason() {
  const colorScheme = useColorScheme();
  const [reasonError, setReasonError] = useState<boolean>(false);
  const router = useRouter();
  const currentUser = useAppSelector<User>(selectUser);
  const chosenContact = useAppSelector<Contact>(selectChosenContact);
  const amount = useAppSelector<number>(selectAmount);
  const reason = useAppSelector<string>(selectReason);
  const currentUserId = useAppSelector<string>(selectUserId);
  const dispatch = useAppDispatch();
  const params = useLocalSearchParams();
  const { isRequest } = params;

  const onPressSend = async () => {
    if (!reason || reasonError) {
      setReasonError(true);
      dispatch(setModalText('not enough funds')); // tale care of this later on
      dispatch(setIsModalVisible(true));
      return;
    }
    if (!chosenContact?.phoneNumbers) return;
    // phone number for recipient in send flow and 'purchaser' (aka requestee) in request flow
    const phoneNumber = chosenContact?.phoneNumbers[0].number;
    if (!phoneNumber) return;
    if (
      currentUser?.accountBalance <= 0 ||
      amount > currentUser?.accountBalance
    ) {
      dispatch(setModalText(i18n.t('sendamount_not_enough_funds')));
      dispatch(setIsModalVisible(true));
      return;
    }
    dispatch(setIsUserLoading(true));
    try {
      const parsedPhoneNumber = parsePhoneNumber(phoneNumber, 'US')
        .nationalNumber as string;
      if (parsedPhoneNumber === currentUser.phoneNumber) {
        throw new Error('Cannot send or make request to yourself');
      }
      const { data: getUserIdByNumberData } = await dispatch(
        getUserIdByNumber(parsedPhoneNumber)
      ).unwrap();
      const requesteeId = getUserIdByNumberData.userId;
      const newTransaction = {
        recipientPhoneNumber: isRequest
          ? currentUser.phoneNumber
          : parsedPhoneNumber,
        amount: amount,
        category: Category.MISC,
        reason: reason,
        // in a request the purchaserid is the id of person the request is sent to and is therefore not known
        purchaserId: isRequest ? requesteeId : currentUserId,
        ...(isRequest && { isRequest: true }),
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
        e instanceof Error ? e.message : 'WRONG PHONE NUMBER';
      dispatch(setModalText(errorMessage));
      dispatch(setIsUserLoading(false));
      dispatch(setIsModalVisible(true));
    }
  };

  const onChangeReason = (reason: string) => {
    if (!reason) {
      setReasonError(true);

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
  const onModalChangeContact = () => {
    dispatch(setIsModalVisible(false));
    dispatch(unsetChosenContact());
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].backgroundHighlight1 }]}>
      <CustomModal
        type='error'
        buttons={[
          { text: i18n.t('cancel'), onPress: onModalCancel },
          { text: i18n.t('sendamount_back'), onPress: onModalChangeContact },
        ]}
      />
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
          width: '60%',
        }}
        onChangeText={onChangeReason}
        inputMode='text'
      />
      <View style={styles.buttonContainer}>
        <CustomButton
          disabled={!reason || reasonError}
          onPress={onPressSend}
          text={i18n.t('sendamount_continue')}
        />
        <CustomButton
          onPress={() => router.back()}
          text={i18n.t('sendamount_back')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
});
