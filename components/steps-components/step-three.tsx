import { View, Text, useColorScheme, TextInput } from 'react-native';
import i18n from '../../translationService';
import Colors from '../../constants/Colors';
import {
  saveTransaction,
  selectAmount,
  selectChosenContact,
  selectReason,
  setAmount,
  setReason,
} from '../../store/sendFormSlice';
import CustomButton from '../utils/CustomButton';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { parsePhoneNumber } from 'libphonenumber-js';
import { setModalText, setIsModalVisible } from '../../store/appStateSlice';
import {
  setIsUserLoading,
  getUserIdByNumber,
  addUserTransaction,
  setUserBalance,
  selectUser,
  selectUserId,
} from '../../store/userSlice';
import { Category } from '../../types/Transaction';
import { User } from '../../types/User';
import { Contact } from 'expo-contacts';

const StepThree = ({
  onClickNext,
  onClickBack,
}: {
  onClickNext: () => void;
  onClickBack: () => void;
}) => {
  const colorScheme = useColorScheme();
  const [amountError, setAmountError] = useState<boolean>(false);
  const amount = useAppSelector<number>(selectAmount);
  const [reasonError, setReasonError] = useState<boolean>(false);
  const reason = useAppSelector<string>(selectReason);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector<User>(selectUser);
  const chosenContact = useAppSelector<Contact>(selectChosenContact);
  const currentUserId = useAppSelector<string>(selectUserId);
  const params = useLocalSearchParams();
  const { isRequest } = params;

  const onPressSend = async () => {
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
      dispatch(setModalText(e.message));
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

  return (
    <View>
      <Text
        style={{
          margin: 20,
          fontSize: 34,
          fontWeight: 500,
          color: Colors[colorScheme ?? 'light'].text,
        }}
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
          borderBottomWidth: 2,
          width: '85%',
          alignSelf: 'center',
        }}
        onChangeText={onChangeReason}
        inputMode='text'
      />
      <View
        style={{
          flexDirection: 'row',
          gap: 30,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
        }}
      >
        <CustomButton
          disabled={!reason || reasonError}
          onPress={onPressSend}
          text={i18n.t('sendamount_continue')}
        />
        <CustomButton onPress={onClickBack} text={i18n.t('sendamount_back')} />
      </View>
    </View>
  );
};
export default StepThree;
