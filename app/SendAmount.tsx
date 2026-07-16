import { View, Text, useColorScheme, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import CustomButton from '../components/utils/CustomButton';
import i18n from '../translationService';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  selectAmount,
  setAmount,
  setReason,
  unsetChosenUser,
} from '../store/sendFormSlice';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { setIsModalVisible } from '../store/appStateSlice';
import { CustomModal } from '../components/utils/CustomModal';
import NumberInputNumberPad, {
  NumberLabel,
} from '../components/form/NumberInputNumberPad';
import { parseNumberPadInputForSend } from '../utils/functions';
import GradientContainer from '../components/utils/GradientContainer';
import SendFlowHeader from '../components/utils/StepsHeader';

export default function SendAmount() {
  const colorScheme = useColorScheme() ?? 'light';
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
  const onModalChangeUser = () => {
    dispatch(setIsModalVisible(false));
    dispatch(unsetChosenUser());
    router.back();
  };
  const onPressNumberPadInput = (n: NumberLabel) => {
    const amountInput = amount === 0 ? '' : amount.toString();
    const newValue = parseNumberPadInputForSend(n, amountInput);
    if (newValue !== false) {
      if (newValue === '') {
        dispatch(setAmount(0));
      } else {
        dispatch(setAmount(parseFloat(newValue)));
      }
    }
  };

  return (
    <GradientContainer safeAreaStyle={{ flex: 1 }} styles={{ flex: 1 }}>
      <SendFlowHeader stage='amount' />
      <View style={styles.contentContainer}>
        <CustomModal
          type="error"
          buttons={[
            { text: i18n.t('cancel'), onPress: onModalCancel },
            { text: i18n.t('sendamount_back'), onPress: onModalChangeUser },
          ]}
        />

        {/* Title and Error */}
        <View style={styles.headerSection}>
          <Text style={{ fontSize: 24, color: Colors[colorScheme].text, textAlign: 'center' }}>
            {isRequest
              ? i18n.t('request_how_much')
              : i18n.t('sendamount_how_much')}
          </Text>
          {amountError && (
            <Text style={{ fontSize: 10, color: Colors[colorScheme].tint, textAlign: 'center' }}>
              {i18n.t('sendamount_validate_amount')}
            </Text>
          )}
        </View>

        {/* Number Pad Input */}
        <View style={styles.numberPadContainer}>
          <NumberInputNumberPad
            onButtonPress={onPressNumberPadInput}
            value={amount === 0 ? '' : amount.toString()}
          />
        </View>

        {/* Buttons at Bottom */}
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
    paddingHorizontal: 6,
    paddingTop: 40,
    paddingBottom: 80, // Ensure buttons clear footer
  },
  headerSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  numberPadContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 'auto', // Pushes to bottom
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
});
