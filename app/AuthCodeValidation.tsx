import { Text, View, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  checkVerificationCode,
  selectPhoneNumber,
} from '../store/authFormSlice';
import CustomButton from '../components/utils/CustomButton';
import { useRouter } from 'expo-router';
import i18n from '../translationService';
import { useState } from 'react';
import { setIsModalVisible, setModalText } from '../store/appStateSlice';
import GradientContainer from '../components/utils/GradientContainer';
import { parsePhoneNumber } from 'libphonenumber-js';
import NumberInputNumberPad, {
  NumberLabel,
} from '../components/form/NumberInputNumberPad';
import { parseNumberPadInputForOTP } from '../utils/functions';

export default function AuthCodeValidation() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [code, setCode] = useState<string>('');
  const phoneNumber = useAppSelector(selectPhoneNumber);

  const onSubmit = () => {
    try {
      const phoneNumberForTwilio = parsePhoneNumber(phoneNumber, 'IL')
        .formatInternational()
        .split(' ')
        .join('');

      dispatch(
        checkVerificationCode({ phoneNumber: phoneNumberForTwilio, code })
      )
        .unwrap()
        .then(() => {
          router.push('/AuthNameEntry');
        });
    } catch (e: any) {
      dispatch(setModalText(e.message));
      dispatch(setIsModalVisible(true));
    }
  };

  const onButtonPress = (n: NumberLabel) => {
    const newCode = parseNumberPadInputForOTP(n, code);
    if (newCode) {
      setCode(newCode);
    }
  };

  return (
    <GradientContainer>
      <>
        <View
          style={{
            height: '90%',
            justifyContent: 'space-around',
            padding: 24,
          }}
        >
          <NumberInputNumberPad value={code} onButtonPress={onButtonPress} />
          <CustomButton
            text={i18n.t('continue')}
            disabled={code.length !== 6}
            onPress={onSubmit}
          />
        </View>
        <View style={{ height: 30 }}>
          {code.length !== 6 && (
            <Text style={styles.numberErrorText}>6 digit required</Text>
          )}
        </View>
      </>
    </GradientContainer>
  );
}

const styles = StyleSheet.create({
  numberErrorText: {
    display: 'flex',
    height: 24,
    margin: 24,
    fontSize: 20,
    color: 'red',
    justifyContent: 'center',
  },
});
