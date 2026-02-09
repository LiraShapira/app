import {
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
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
  selectSelectedCommunityId,
  sendRegistrationForm,
  setFirstName,
  setLastName,
  setSelectedCommunityId,
} from '../store/authFormSlice';
import { setModalText, setIsModalVisible } from '../store/appStateSlice';
import { setUser } from '../store/userSlice';
import { StorageKeys } from '../types/AsyncStorage';
import { setItem } from '../utils/asyncStorage';
import { parsePhoneNumber } from 'libphonenumber-js';
import { fetchCommunities } from '../API/communitiesAPI';
import { Community } from '../types/Community';

export default function AuthNameEntry() {
  const colorScheme = useColorScheme() || 'light';
  const router = useRouter();
  const firstName = useAppSelector(selectFirstName);
  const lastName = useAppSelector(selectLastName);
  const selectedCommunityId = useAppSelector(selectSelectedCommunityId);
  const dispatch = useAppDispatch();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loadingCommunities, setLoadingCommunities] = useState(true);

  useEffect(() => {
    const load = async () => {
      const response = await fetchCommunities();
      if ('data' in response && response.data) {
        setCommunities(response.data);
        if (response.data.length === 1 && !selectedCommunityId) {
          dispatch(setSelectedCommunityId(response.data[0].id));
        }
      }
      setLoadingCommunities(false);
    };
    load();
  }, [dispatch, selectedCommunityId]);

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
        dispatch(setModalText(e?.message || i18n.t('generic_error')));
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
          <Text style={{ color: Colors[colorScheme].text }}>{i18n.t('auth_first_name')}</Text>
          <TextInput
            value={firstName}
            onChangeText={(e) => dispatch(setFirstName(e))}
            style={{ color: Colors[colorScheme].text, ...styles.inputtedValue }}
          />
          <Text style={{ color: Colors[colorScheme].text }}>{i18n.t('auth_last_name')}</Text>
          <TextInput
            value={lastName}
            onChangeText={(e) => dispatch(setLastName(e))}
            style={{ color: Colors[colorScheme].text, ...styles.inputtedValue }}
          />
          <Text style={{ color: Colors[colorScheme].text }}>{i18n.t('auth_community')}</Text>
          {loadingCommunities ? (
            <ActivityIndicator style={{ marginVertical: 8 }} />
          ) : (
            <View
              style={{
                backgroundColor: Colors[colorScheme].highlight,
                borderRadius: 10,
                marginVertical: 8,
                paddingHorizontal: 10,
                paddingVertical: 4,
              }}
            >
              <Picker
                selectedValue={selectedCommunityId || ''}
                onValueChange={(id) => dispatch(setSelectedCommunityId(id || ''))}
                style={{
                  fontSize: 18,
                  height: 56,
                  color: Colors[colorScheme].text,
                }}
                mode="dropdown"
              >
                <Picker.Item label={i18n.t('deposit_compost_stand_blank')} value="" />
                {communities.map((c) => (
                  <Picker.Item
                    key={c.id}
                    label={c.CommunityName || c.id}
                    value={c.id}
                  />
                ))}
              </Picker>
            </View>
          )}
        </View>
        <CustomButton
          disabled={!firstName || !lastName || !selectedCommunityId || loadingCommunities}
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
    height: 40, // ⬅️ increase this
    marginVertical: 0,
    marginHorizontal: 'auto',
  }
});
