import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { selectCompostStand, setCompostStand } from '../store/depositFormSlice';
import { CompostStand } from '../types/Deposit';
import { Text, View, StyleSheet, useColorScheme } from 'react-native';
import { setUser } from '../store/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  selectPhoneNumber,
  sendLoginForm,
  setIsLoggedIn,
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
  const selectedCompostStand = useAppSelector(selectCompostStand);
  const [isNumberError, setIsNumberError] = useState<boolean>(false);

  const onChangePhoneNumber = (n: NumberLabel) => {
    const newNumber = parseNumberPadInputForPhoneNumber(n, phoneNumber);
    if (newNumber !== false) {
      try {
        dispatch(setPhoneNumber(newNumber));
        const parsedPhoneNumber = parsePhoneNumber(newNumber, 'IL');
        if (parsedPhoneNumber.isPossible() && parsedPhoneNumber.isValid()) {
          setIsNumberError(false);
        } else {
          throw new Error('parsed number not possible or valid');
        }
      } catch (e) {
        console.log(e);
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
          setUser(user);
          setItem(StorageKeys.phoneNumber, user.phoneNumber);
          setItem(StorageKeys.compostStand, selectedCompostStand);
          dispatch(setIsLoggedIn(true));
        }
        router.push('/Home');
      })
      .catch((e) => {
        dispatch(setModalText(e.message));
        dispatch(setIsModalVisible(true));
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
