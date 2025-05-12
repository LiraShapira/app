import { Text, View, StyleSheet } from 'react-native';
import { setUser } from '../store/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  selectPhoneNumber,
  sendLoginForm,
  sendVerificationCode,
  setPhoneNumber,
} from '../store/authFormSlice';
import CustomButton from '../components/utils/CustomButton';
import { setItem } from '../utils/asyncStorage';
import { useRouter } from 'expo-router';
import { StorageKeys } from '../types/AsyncStorage';
import i18n from '../translationService';
import { useState } from 'react';
import { setIsModalVisible, setModalText } from '../store/appStateSlice';
import GradientContainer from '../components/utils/GradientContainer';
import NumberInputNumberPad from '../components/form/NumberInputNumberPad';
import { parseNumberPadInputForPhoneNumber } from '../utils/functions';
import { parsePhoneNumber } from 'libphonenumber-js';
import { NumberLabel } from '../components/form/NumberInputNumberPad';

export default function AuthPhoneEntry() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const displayedPhoneNumber = useAppSelector(selectPhoneNumber);

  // Track validation and whether the input has been touched
  const [isNumberError, setIsNumberError] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const onChangePhoneNumber = (n: NumberLabel) => {
    setIsTouched(true);
    const newNumber = parseNumberPadInputForPhoneNumber(n, displayedPhoneNumber);
    if (newNumber !== false) {
      dispatch(setPhoneNumber(newNumber));

      try {
        const parsedPhoneNumber = parsePhoneNumber(newNumber, 'IL');
        if (parsedPhoneNumber.isPossible() && parsedPhoneNumber.isValid()) {
          setIsNumberError(false);
        } else {
          throw new Error(i18n.t('auth_number_error'));
        }
      } catch (e) {
        setIsNumberError(true);
      }
    }
  };

  const onSubmit = () => {
    dispatch(sendLoginForm())
      .unwrap()
      .then(({ data: user }) => {
        if (user) {
          dispatch(setUser(user));
          const parsedPhoneNumber = parsePhoneNumber(user.phoneNumber, 'IL').nationalNumber;
          setItem(StorageKeys.phoneNumber, parsedPhoneNumber);
          router.push('/Home');
        }
      })
      .catch((e) => {
        if (e.message === 'User not found') {
          const phoneNumberForTwilio = parsePhoneNumber(displayedPhoneNumber, 'IL')
            .formatInternational()
            .split(' ')
            .join('');

          dispatch(sendVerificationCode(phoneNumberForTwilio))
            .unwrap()
            .then(() => router.push('/AuthCodeValidation'))
            .catch(console.error);
        } else {
          dispatch(setModalText(e.message));
          dispatch(setIsModalVisible(true));
        }
      });
  };

  // Disable continue button until input is touched and valid
  const isContinueDisabled = !isTouched || isNumberError;

  return (
    <GradientContainer>
      <View style={{ height: '90%', justifyContent: 'space-around', padding: 24 }}>
        <Text>
          {i18n.t('enter_number')}
        </Text>
        <NumberInputNumberPad
          allowDecimal={false}
          value={displayedPhoneNumber}
          onButtonPress={onChangePhoneNumber}
        />
        <CustomButton
          text={i18n.t('continue')}
          disabled={isContinueDisabled}
          onPress={onSubmit}
        />
      </View>

      <View style={{ height: 30 }}>
        {isTouched && isNumberError && (
          <Text style={styles.numberErrorText}>
            {i18n.t('auth_number_error')}
          </Text>
        )}
      </View>
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
