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
          backgroundColor:
            colorScheme === 'light' ? Colors.light.backgroundHighlight1 : '',
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
