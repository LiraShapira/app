import { View, Text, useColorScheme, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import CustomButton from '../components/utils/CustomButton';
import i18n from '../translationService';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  selectAmount,
  setAmount,
  setReason,
  unsetChosenContact,
} from '../store/sendFormSlice';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { setIsModalVisible } from '../store/appStateSlice';
import { CustomModal } from '../components/utils/CustomModal';
import NumberInputNumberPad, {
  NumberLabel,
} from '../components/form/NumberInputNumberPad';
import { parseNumberPadInputForDeposit } from '../utils/functions';

export default function SendAmount() {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const amount = useAppSelector<number>(selectAmount);
  const router = useRouter();
  const [amountError, setAmountError] = useState<boolean>(false);
  const params = useLocalSearchParams();
  const { isRequest } = params;

  // const onPressSend = async () => {
  //   if (!chosenContact?.phoneNumbers) return;

  //   // phone number for recipient in send flow and 'purchaser' (aka requestee) in request flow
  //   const phoneNumber = chosenContact?.phoneNumbers[0].number;

  //   if (!phoneNumber) return;

  //   if (
  //     currentUser?.accountBalance <= 0 ||
  //     amount > currentUser?.accountBalance
  //   ) {
  //     dispatch(setModalText(i18n.t('sendamount_not_enough_funds')));
  //     dispatch(setIsModalVisible(true));
  //     return;
  //   }
  //   dispatch(setIsUserLoading(true));

  //   try {
  //     const parsedPhoneNumber = parsePhoneNumber(phoneNumber, 'US')
  //       .nationalNumber as string;
  //     if (parsedPhoneNumber === currentUser.phoneNumber) {
  //       throw new Error('Cannot send or make request to yourself');
  //     }
  //     const { data: getUserIdByNumberData } = await dispatch(
  //       getUserIdByNumber(parsedPhoneNumber)
  //     ).unwrap();
  //     const requesteeId = getUserIdByNumberData.userId;
  //     const newTransaction = {
  //       recipientPhoneNumber: isRequest
  //         ? currentUser.phoneNumber
  //         : parsedPhoneNumber,
  //       amount: amount,
  //       category: Category.MISC,
  //       reason: reason,
  //       // in a request the purchaserid is the id of person the request is sent to and is therefore not known
  //       purchaserId: isRequest ? requesteeId : currentUserId,
  //       ...(isRequest && { isRequest: true }),
  //     };

  //     const { data: transaction } = await dispatch(
  //       saveTransaction(newTransaction)
  //     ).unwrap();
  //     dispatch(addUserTransaction(transaction));
  //     if (!isRequest) {
  //       const updatedBalance = currentUser.accountBalance - amount;
  //       dispatch(setUserBalance(updatedBalance));
  //     }
  //     dispatch(setAmount(0));
  //     dispatch(setReason(''));
  //     dispatch(setIsUserLoading(false));
  //     router.push('/Home');
  //   } catch (e) {
  //     dispatch(setModalText(e.message));
  //     dispatch(setIsUserLoading(false));
  //     dispatch(setIsModalVisible(true));
  //   }
  //   console.log('test');
  // };

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
  const onPressNumberPadInput = (n: NumberLabel) => {
    const newValue = parseNumberPadInputForDeposit(n, amount.toString());
    // NB! conditional on false required because 0 falsy value
    if (newValue !== false) {
      dispatch(setAmount(newValue));
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[colorScheme ?? 'light'].backgroundHighlight1,
        },
      ]}
    >
      <CustomModal
        type='error'
        buttons={[
          { text: i18n.t('cancel'), onPress: onModalCancel },
          { text: i18n.t('sendamount_back'), onPress: onModalChangeContact },
        ]}
      />
      <View>
        <Text
          style={{ fontSize: 24, color: Colors[colorScheme ?? 'light'].text }}
        >
          {isRequest
            ? i18n.t('request_how_much')
            : i18n.t('sendamount_how_much')}
        </Text>
        {amountError ? (
          <Text
            style={{ fontSize: 10, color: Colors[colorScheme ?? 'light'].tint }}
          >
            {i18n.t('sendamount_validate_amount')}
          </Text>
        ) : null}
        <NumberInputNumberPad
          onButtonPress={onPressNumberPadInput}
          value={amount.toString()}
          onChangeText={onChangeAmount}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          disabled={!amount || amountError}
          onPress={() => {
            router.push(
              isRequest ? '/SendReason?isRequest=true' : '/SendReason'
            );
          }}
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
    padding: 30,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 35,
    justifyContent: 'center',
    top: 40,
    padding: 10,

  },
});
