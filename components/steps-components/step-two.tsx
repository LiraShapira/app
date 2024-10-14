import { View, Text, useColorScheme, StyleSheet } from 'react-native';
import i18n from '../../translationService';

import { router, useLocalSearchParams } from 'expo-router';
import {
  saveTransaction,
  selectAmount,
  selectChosenContact,
  selectReason,
  setAmount,
} from '../../store/sendFormSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Colors from '../../constants/Colors';
import { useEffect, useState } from 'react';
import NumberInputNumberPad, {
  NumberLabel,
} from '../../components/form/NumberInputNumberPad';
import { parseNumberPadInputForDeposit } from '../../utils/functions';
import { selectDepositValue } from '../../store/depositFormSlice';
import { setIsModalVisible, setModalText } from '../../store/appStateSlice';
import CustomButton from '../../components/utils/CustomButton';
import { parsePhoneNumber } from 'libphonenumber-js';
import {
  setIsUserLoading,
  getUserIdByNumber,
  addUserTransaction,
  setUserBalance,
  selectUserId,
  selectUser,
} from '../../store/userSlice';
import { Category } from '../../types/Transaction';
import { Contact } from 'expo-contacts';
import { User } from '../../types/User';
import { useNavigation } from '@react-navigation/native';

const StepTwo = ({
  onClickNext,
  onClickBack,
}: {
  onClickNext: () => void;
  onClickBack: () => void;
}) => {
  const params = useLocalSearchParams();
  const { isRequest } = params;
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const [amountError, setAmountError] = useState<boolean>(false);
  const chosenContact = useAppSelector<Contact>(selectChosenContact);
  const currentUserId = useAppSelector<string>(selectUserId);
  const currentUser = useAppSelector<User>(selectUser);
  const amount = useAppSelector<any>(selectAmount);
  const reason = useAppSelector<string>(selectReason);
  const navigation = useNavigation();

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
        reason: reason,
        category: Category.MISC,
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
      dispatch(setIsUserLoading(false));

      router.push('/Home');
    } catch (e) {
      dispatch(setModalText(e.message));
      dispatch(setIsUserLoading(false));
      dispatch(setIsModalVisible(true));
    }
  };

  const onPressNumberPadInput = (n: NumberLabel) => {
    const newValue = parseNumberPadInputForDeposit(n, amount.toString());
    // NB! conditional on false required because 0 falsy value
    console.log(newValue);
    if (newValue !== false) {
      dispatch(setAmount(newValue));
    }
  };

  const onChangeAmount = (amount: string) => {
    if (!amount) {
      setAmountError(true);
      return;
    }
    if (!parseInt(amount)) {
      setAmountError(true);
      return;
    }
    if (Number.isNaN(parseInt(amount))) {
      setAmountError(true);
      return;
    }
    setAmountError(false);
    dispatch(setAmount(parseInt(amount)));
  };

  const handleBackToSend = () => {
    navigation.navigate('Send', { isRequest: true });
  };

  return (
    <View style={{}}>
      <Text
        style={{
          fontSize: 35,
          paddingVertical: 16,
          color: Colors[colorScheme ?? 'light'].text,
          fontWeight: 700,
          margin: 7,
        }}
      >
        {isRequest ? i18n.t('request_how_much') : i18n.t('sendamount_how_much')}
      </Text>

      <NumberInputNumberPad
        onButtonPress={onPressNumberPadInput}
        appendedText={i18n.t('deposit_form_kilogram')}
        value={amount}
      />
      <View
        style={{
          flexDirection: 'row',
          gap: 30,
          justifyContent: 'center',
          marginTop: 50,
        }}
      >
        <CustomButton
          onPress={handleBackToSend}
          text={i18n.t('sendamount_back')}
        />
        <CustomButton
          disabled={!amount || amountError}
          onPress={onClickNext}
          text={i18n.t('sendamount_continue')}
        />
      </View>

      <View>
        {amountError ? (
          <Text
            style={{ fontSize: 10, color: Colors[colorScheme ?? 'light'].tint }}
          >
            {i18n.t('sendamount_validate_amount')}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default StepTwo;
