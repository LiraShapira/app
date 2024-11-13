import {
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import GradientContainer from '../components/utils/GradientContainer';
import Colors from '../constants/Colors';
import i18n from '../translationService';
import LiraShapiraLogo from '../assets/icons/lira-shapira-logo';
import CustomButton from '../components/utils/CustomButton';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  selectFirstName,
  selectLastName,
  sendRegistrationForm,
  setFirstName,
  setLastName,
} from '../store/authFormSlice';
import { setModalText, setIsModalVisible } from '../store/appStateSlice';
import { setUser } from '../store/userSlice';
import { StorageKeys } from '../types/AsyncStorage';
import { setItem } from '../utils/asyncStorage';
import { parsePhoneNumber } from 'libphonenumber-js';

export default function AuthNameEntry() {
  const colorScheme = useColorScheme() || 'light';
  const router = useRouter();
  const firstName = useAppSelector(selectFirstName);
  const lastName = useAppSelector(selectLastName);
  const dispatch = useAppDispatch();

  const onPressContinue = () => {
    dispatch(sendRegistrationForm())
      .unwrap()
      .then(({ data: user }) => {
        if (user) {
          dispatch(setUser(user));
          // save phoneNumber locally in format 5******** (9 digits) 
          const parsedPhoneNumber = parsePhoneNumber(user.phoneNumber, 'IL').nationalNumber;
          setItem(StorageKeys.phoneNumber, parsedPhoneNumber);
        }
        router.push('/Home');
      })
      .catch((e) => {
        dispatch(setModalText(i18n.t('generic_error')));
        dispatch(setIsModalVisible(true));
      });
  };

  return (
    <GradientContainer>
      <View
        style={{
          justifyContent: 'space-around',
          height: '100%',
          gap: 10,
          padding: 24,
          alignItems: 'center',
        }}
      >
        <LiraShapiraLogo />
        <View style={{ width: '100%' }}>
          <Text>{i18n.t('auth_first_name')}</Text>
          <TextInput
            value={firstName}
            onChangeText={(e) => dispatch(setFirstName(e))}
            style={{ color: Colors[colorScheme].text, ...styles.inputtedValue }}
          />
          <Text>{i18n.t('auth_last_name')}</Text>
          <TextInput
            value={lastName}
            onChangeText={(e) => dispatch(setLastName(e))}
            style={{ color: Colors[colorScheme].text, ...styles.inputtedValue }}
          />
        </View>
        <CustomButton
          disabled={!firstName || !lastName}
          onPress={onPressContinue}
          text={i18n.t('continue')}
        />
      </View>
    </GradientContainer>
  );
}

const styles = StyleSheet.create({
  inputtedValue: {
    fontSize: 18,
    borderBottomWidth: 1,
    width: '100%',
    height: 24,
    marginVertical: 0,
    marginHorizontal: 'auto',
  },
});
