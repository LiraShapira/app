import { StyleSheet, TextInput, useColorScheme } from 'react-native';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { setUser } from '../store/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  selectFirstName,
  selectLastName,
  selectPhoneNumber,
  sendLoginForm,
  sendRegistrationForm,
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
import { setIsModalVisible, setModalText } from '../store/appStateSlice';
import { CustomModal } from '../components/utils/CustomModal';

export default function Auth() {
  const colorScheme = useColorScheme() ?? 'light';
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [regUI, setRegUI] = useState<boolean>(true);
  const phoneNumber = useAppSelector(selectPhoneNumber);
  const firstName = useAppSelector(selectFirstName);
  const lastName = useAppSelector(selectLastName);

  const onSubmit = () => {
    if (regUI) {
      dispatch(sendRegistrationForm())
        .unwrap()
        .then(({ data: user }) => {
          if ({ user }) {
            setUser(user);
            setItem(StorageKeys.phoneNumber, user.phoneNumber);
            dispatch(setIsLoggedIn(true));
          }
          router.push('/Home');
        })
        .catch((e) => {
          dispatch(setModalText(e.message));
          dispatch(setIsModalVisible(true));
        });
    } else {
      dispatch(sendLoginForm())
        .unwrap()
        .then(({ data: user }) => {
          if ({ user }) {
            setUser(user);
            setItem(StorageKeys.phoneNumber, user.phoneNumber);
            dispatch(setIsLoggedIn(true));
          }
          router.push('/Home');
        })
        .catch((e) => {
          dispatch(setModalText(e.message));
          dispatch(setIsModalVisible(true));
        });
    }
  };

  const onFailedLogin = () => {
    dispatch(setIsModalVisible(false));
    setRegUI(true);
  };

  return (
    <View style={styles.container}>
      <CustomModal
        type="info"
        buttons={[
          {
            text: `no user exists for this number. Please register`,
            onPress: onFailedLogin,
          },
        ]}
      />
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
              onChangeText={(t) => dispatch(setFirstName(t))}
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
              onChangeText={(t) => dispatch(setLastName(t))}
              placeholderTextColor={Colors[colorScheme].shading}
            />
          </View>
        ) : null}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{paddingRight: 8 }}>+972</Text>
          <TextInput
            inputMode="numeric"
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
            onChangeText={(t) => dispatch(setPhoneNumber(t))}
          />
        </View>
      </View>

      <View style={{ padding: 8, flexDirection: 'row' }}>
        <CustomButton
          text={regUI ? i18n.t('auth_register') : i18n.t('auth_login')}
          disabled={!phoneNumber || (regUI && (!firstName || !lastName))}
          onPress={onSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '50%',
    marginBottom: '50%',
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
