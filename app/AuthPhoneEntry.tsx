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
import NumberInputNumberPad, {
  NumberLabel,
} from '../components/form/NumberInputNumberPad';
import { parseNumberPadInputForPhoneNumber } from '../utils/functions';
import { parsePhoneNumber } from 'libphonenumber-js';

export default function AuthPhoneEntry() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const phoneNumber = useAppSelector(selectPhoneNumber);
  const [isNumberError, setIsNumberError] = useState<boolean>(true);

  const onChangePhoneNumber = (n: NumberLabel) => {
    const newNumber = parseNumberPadInputForPhoneNumber(n, phoneNumber);
    if (newNumber !== false) {
      try {
        dispatch(setPhoneNumber(newNumber));
        const parsedPhoneNumber = parsePhoneNumber(newNumber, 'IL');
        if (parsedPhoneNumber.isPossible() && parsedPhoneNumber.isValid()) {
          setIsNumberError(false);
        } else {
          throw new Error(i18n.t('auth_number_error'));
        }
      } catch (e) {
        // TODO dynamic descriptive error text for user
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
          setItem(StorageKeys.phoneNumber, user.phoneNumber);
          router.push('/Home');
          return;
        }
        const phoneNumberForTwilio = parsePhoneNumber(phoneNumber, 'IL')
          .formatInternational()
          .split(' ')
          .join('');

        dispatch(sendVerificationCode(phoneNumberForTwilio))
          .unwrap()
          .then(() => {
            console.log('received');
            router.push('/AuthCodeValidation');
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        if (e.message === 'User not found') {
          const phoneNumberForTwilio = parsePhoneNumber(phoneNumber, 'IL')
            .formatInternational()
            .split(' ')
            .join('')

          dispatch(sendVerificationCode(phoneNumberForTwilio))
            .unwrap()
            .then(() => {
              router.push('/AuthCodeValidation');
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          dispatch(setModalText(e.message));
          dispatch(setIsModalVisible(true));
        }
      });
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
          <NumberInputNumberPad
            value={phoneNumber}
            onButtonPress={onChangePhoneNumber}
          />
          <CustomButton
            text={i18n.t('continue')}
            disabled={isNumberError}
            onPress={onSubmit}
          />
        </View>
        <View style={{ height: 30 }}>
          {isNumberError && (
            <Text style={styles.numberErrorText}>Number not valid</Text>
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
