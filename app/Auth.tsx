import { StyleSheet, TextInput, useColorScheme } from 'react-native';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { setUser } from '../store/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  selectFirstName,
  selectLastName,
  selectPhoneNumber,
  sendAuthForm,
  setFirstName,
  setIsLoggedIn,
  setLastName,
  setPhoneNumber,
} from '../store/authFormSlice';
import CustomButton from '../components/utils/CustomButton';
import { setItem } from '../utils/asyncStorage';
import { useRouter } from 'expo-router';
import { StorageKeys } from '../types/AsyncStorage';
import i18n from '../translationService';
import { useState } from 'react';

const useRegistrationForm = () => {
  const dispatch = useAppDispatch();
  const firstName = useAppSelector(selectFirstName);
  const lastName = useAppSelector(selectLastName);
  const phoneNumber = useAppSelector(selectPhoneNumber);

  return {
    firstName,
    lastName,
    phoneNumber,
    setFirstName: (firstName: string) => dispatch(setFirstName(firstName)),
    setLastName: (lastName: string) => dispatch(setLastName(lastName)),
    setPhoneNumber: (phoneNumber: string) =>
      dispatch(setPhoneNumber(phoneNumber)),
  };
};

export default function Auth() {
  const colorScheme = useColorScheme() ?? 'light';
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [regUI, setRegUI] = useState<boolean>(true);

  const { setFirstName, setLastName, setPhoneNumber } = useRegistrationForm();

  const onSubmit = () => {
    dispatch(sendAuthForm())
      .unwrap()
      .then((user) => {
        if (user) {
          setUser(user);
          setItem(StorageKeys.phoneNumber, user.phoneNumber);
          dispatch(setIsLoggedIn(true));
        }
        router.push('/Home');
      });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '90%',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontSize: 40 }}>
            {regUI ? i18n.t('auth_register') : i18n.t('auth_login')}
          </Text>
          <CustomButton
            size={'s'}
            text={regUI ? i18n.t('auth_to_login') : i18n.t('auth_to_register')}
            onPress={() => setRegUI(!regUI)}
          />
        </View>
        {regUI ? (
          <View style={styles.fullNameInputContainer}>
            <TextInput
              style={{
                color: Colors[colorScheme].text,
                borderBottomColor: Colors[colorScheme].text,
                ...styles.nameInput,
              }}
              onChangeText={setFirstName}
              placeholder={'First Name'}
              placeholderTextColor={Colors[colorScheme].shading}
            />
            <TextInput
              style={{
                ...styles.nameInput,
                color: Colors[colorScheme].text,
                borderBottomColor: Colors[colorScheme].text,
              }}
              placeholder={'Last Name'}
              onChangeText={setLastName}
              placeholderTextColor={Colors[colorScheme].shading}
            />
          </View>
        ) : null}
        <TextInput
          style={{
            color: Colors[colorScheme].text,
            borderStyle: 'solid',
            marginTop: 4,
            borderBottomColor: Colors[colorScheme].text,
            borderWidth: 1,
            paddingHorizontal: 4,
            height: 36,
            marginHorizontal: 1,
            width: '100%',
            alignSelf: 'center', // Center the TextInput element horizontally
          }}
          placeholder={'Phone Number'}
          placeholderTextColor={Colors[colorScheme].shading}
          onChangeText={setPhoneNumber}
        />
      </View>

      <View style={{ padding: 8, flexDirection: 'row' }}>
        <CustomButton text="Submit" onPress={onSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameInput: {
    borderStyle: 'solid',
    borderWidth: 1,
    height: 36,
    flexBasis: '50%',
    marginHorizontal: 1,
  },
  fullNameInputContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  submit: {
    marginTop: 7,
  },
});
