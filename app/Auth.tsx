import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { selectCompostStand, setCompostStand } from '../store/depositFormSlice';
import { CompostStand } from '../types/Deposit';
import { Picker } from '@react-native-picker/picker';
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
import { CustomModal } from '../components/utils/CustomModal';
import Registration from '../components/auth/Registration';

export default function Auth() {

  const colorScheme = useColorScheme() ?? 'light';
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [regUI, setRegUI] = useState<boolean>(true);
  const phoneNumber = useAppSelector(selectPhoneNumber);
  const firstName = useAppSelector(selectFirstName);
  const lastName = useAppSelector(selectLastName);
  const selectedCompostStand = useAppSelector(selectCompostStand);
  const isRegButtonDisabled = !phoneNumber || (regUI && (!firstName || !lastName)) || !selectedCompostStand;

  const onSubmit = () => {
    if (regUI) {
      dispatch(sendRegistrationForm())
        .unwrap()
        .then(({ data: user }) => {
          if (user) {
            setUser(user);
            setItem(StorageKeys.phoneNumber, user.phoneNumber);

            AsyncStorage.setItem('compostStand', selectedCompostStand);

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
          if (user) {
            setUser(user);
            setItem(StorageKeys.phoneNumber, user.phoneNumber);

            AsyncStorage.setItem('compostStand', selectedCompostStand);

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

  useEffect(() => {
    const retrieveCompostStand = async () => {
      try {
        const storedCompostStand = await AsyncStorage.getItem('compostStand');
        if (storedCompostStand) {
          const compostStand: CompostStand = storedCompostStand as CompostStand;
          dispatch(setCompostStand(compostStand));
        }
      } catch (error) {
        console.error('Error retrieving compostStand from local storage:', error);
      }
    };

    retrieveCompostStand();
  }, [dispatch]);


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
          <Registration />
        ) : null}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ paddingRight: 8 }}>+972</Text>
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
              alignSelf: 'center',
            }}
            placeholder={i18n.t('auth_phone_number')}
            placeholderTextColor={Colors[colorScheme].shading}
            onChangeText={(t) => dispatch(setPhoneNumber(t))}
          />
        </View>
        <Picker
          selectedValue={selectedCompostStand}
          onValueChange={(stand: CompostStand) => {
            console.log('Selected Compost Stand:', stand);
            dispatch(setCompostStand(stand));
          }}
          style={styles.picker}
        >
          {Object.keys(CompostStand).map((stand) => (
            <Picker.Item key={stand} label={i18n.t(`deposit_compost_stand_${stand}`)} value={stand} />
          ))}
        </Picker>
      </View>

      <View style={{ padding: 8, flexDirection: 'row' }}>
        <CustomButton
          text={regUI ? i18n.t('auth_register') : i18n.t('auth_login')}
          disabled={isRegButtonDisabled}
          onPress={onSubmit}
        />
      </View>
      <Image
        source={require('/Users/Lenovo/app/app/images/LiraShapiraLogo.jpeg')}
        style={{ width: 200, height: 200 }}
      />
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
  submit: {
    marginTop: 7,
  },
  picker: {
    marginTop: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    height: 36,
    marginHorizontal: 1,
    alignItems: 'center',
    width: '100%',
  },
});
