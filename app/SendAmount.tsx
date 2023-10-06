import { View, Text, TextInput, useColorScheme } from 'react-native';
import Colors from '../constants/Colors';
import CustomButton from '../components/utils/CustomButton';
import i18n from '../translationService';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  saveTransaction,
  selectAmount,
  selectChosenContact,
  selectReason,
  setAmount,
  setReason,
  unsetChosenContact,
} from '../store/sendFormSlice';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Category } from '../types/Transaction';
import {
  addUserTransaction,
  selectUserId,
  setUserBalance,
} from '../store/userSlice';
import { setIsModalVisible, setModalText } from '../store/appStateSlice';
import { CustomModal } from '../components/utils/CustomModal';

export default function SendAmount() {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const chosenContact = useAppSelector(selectChosenContact);
  const amount = useAppSelector(selectAmount);
  const reason = useAppSelector(selectReason);
  const router = useRouter();
  const [amountError, setAmountError] = useState<boolean>(false);
  const [reasonError, setReasonError] = useState<boolean>(false);
  const userId = useAppSelector(selectUserId);

  const onPressSend = () => {
    if (!chosenContact?.phoneNumbers) return;
    const recipientPhoneNumber = chosenContact?.phoneNumbers[0].number;
    if (!recipientPhoneNumber) return;

    const newTransaction = {
      recipientPhoneNumber: recipientPhoneNumber,
      amount: amount,
      category: Category.MISC,
      reason: reason,
      purchaserId: userId,
    };
    dispatch(saveTransaction(newTransaction))
      .unwrap()
      .then(({ data: transaction }) => {
        const currentUser = transaction.users.find(
          (user) => user.id === userId
        );
        const { users, ...transactionWithoutUsers } = transaction;
        dispatch(addUserTransaction(transactionWithoutUsers));
        if (!currentUser) return;
        dispatch(setUserBalance(currentUser.accountBalance));
        dispatch(setAmount(0));
        dispatch(setReason(''));
        router.push('/Home');
      })
      .catch((e) => {
        dispatch(setModalText(e.message));
        dispatch(setIsModalVisible(true));
      });
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
    router.replace('/Send');
  };

  return (
    <View style={{ padding: 8, gap: 8, alignItems: 'center' }}>
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
          {i18n.t('sendamount_how_much')}
        </Text>
        {amountError ? (
          <Text
            style={{ fontSize: 10, color: Colors[colorScheme ?? 'light'].tint }}
          >
            Please input a number between 1 - 99
          </Text>
        ) : null}
        <TextInput
          autoFocus
          maxLength={2}
          style={{
            fontSize: 44,
            textAlign: 'center',
            color: Colors[colorScheme ?? 'light'].text,
            borderBottomWidth: 1,
            width: '60%',
            ...(amountError && { borderColor: 'red' }),
          }}
          onChangeText={onChangeAmount}
          inputMode='numeric'
        />
      </View>
      <View>
        <Text
          style={{ fontSize: 24, color: Colors[colorScheme ?? 'light'].text }}
        >
          { i18n.t('sendamount_reason')}
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
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 4,
          padding: 8,
          alignSelf: 'center',
        }}
      >
        <CustomButton
          disabled={!reason || !amount || amountError || reasonError}
          onPress={onPressSend}
          text={i18n.t('sendamount_continue')}
        />
        <CustomButton
          onPress={() => router.replace('/Send')}
          text={i18n.t('sendamount_back')}
        />
      </View>
    </View>
  );
}
