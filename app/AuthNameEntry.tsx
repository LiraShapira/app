import {
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useState } from 'react';
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
  selectCommunityId,
  sendRegistrationForm,
  setFirstName,
  setLastName,
  setCommunityId,
} from '../store/authFormSlice';
import { setModalText, setIsModalVisible } from '../store/appStateSlice';
import { setUser } from '../store/userSlice';
import { StorageKeys } from '../types/AsyncStorage';
import { setItem } from '../utils/asyncStorage';
import { parsePhoneNumber } from 'libphonenumber-js';
import { fetchCommunities, Community } from '../API/communitiesAPI';

export default function AuthNameEntry() {
  const colorScheme = useColorScheme() || 'light';
  const router = useRouter();
  const firstName = useAppSelector(selectFirstName);
  const lastName = useAppSelector(selectLastName);
  const communityId = useAppSelector(selectCommunityId);
  const dispatch = useAppDispatch();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loadingCommunities, setLoadingCommunities] = useState(true);

  useEffect(() => {
    fetchCommunities()
      .then((res) => {
        if ('data' in res && res.data) {
          setCommunities(res.data);
        }
      })
      .catch(() => setCommunities([]))
      .finally(() => setLoadingCommunities(false));
  }, []);

  const onPressContinue = () => {
    dispatch(sendRegistrationForm())
      .unwrap()
      .then(({ data: user }) => {
        if (user) {
          dispatch(setUser(user));
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
          <Text style={{ color: Colors[colorScheme].text, marginTop: 12 }}>
            {i18n.t('auth_community') ?? 'Community'}
          </Text>
          {loadingCommunities ? (
            <ActivityIndicator size="small" color={Colors[colorScheme].text} style={{ marginVertical: 8 }} />
          ) : (
            <View style={[styles.pickerWrap, { backgroundColor: Colors[colorScheme].highlight }]}>
              <Picker
                selectedValue={communityId || ''}
                onValueChange={(id) => dispatch(setCommunityId(id || ''))}
                style={{ color: Colors[colorScheme].text }}
                mode="dropdown"
              >
                <Picker.Item label={i18n.t('auth_community_placeholder') ?? 'Select community...'} value="" />
                {communities.map((c) => (
                  <Picker.Item key={c.id} label={c.CommunityName} value={c.id} />
                ))}
              </Picker>
            </View>
          )}
        </View>
        <CustomButton
          disabled={!firstName || !lastName || !communityId || loadingCommunities}
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
  },
  pickerWrap: {
    borderRadius: 8,
    marginVertical: 8,
    overflow: 'hidden',
  },
});
