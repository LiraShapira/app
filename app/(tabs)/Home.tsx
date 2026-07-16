import {
  Appearance,
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View as RNView,
} from 'react-native';
import { Text, View } from '../../components/Themed';
import TransactionsList from '../../components/transactions/TransactionsList';
import Dashboard, { ButtonGroup } from '../../components/home/Dashboard';
import i18n from '../../translationService';
import { selectUser, setCommunityCoin, resetUser } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import GradientContainer from '../../components/utils/GradientContainer';
import RequestCard from '../../components/requests/RequestCard';
import { User } from '../../types/User';
import Colors from '../../constants/Colors';
import { useState, useEffect } from 'react';
import { fetchVerificationMessage } from '../../API/verificationMessageAPI';
import { fetchCommunityById } from '../../API/communitiesAPI';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  setPreferredLocale,
  setPreferredColorScheme,
  selectPreferredLocale,
  selectPreferredColorScheme,
} from '../../store/preferencesSlice';
import { removeItem, setItem } from '../../utils/asyncStorage';
import { StorageKeys } from '../../types/AsyncStorage';
import type { ColorSchemePreference } from '../../store/preferencesSlice';
import { setIsLoggedIn } from '../../store/authFormSlice';
import { useRouter } from 'expo-router';

const SUPPORTED_LOCALES: { code: string; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'he', label: 'עברית' },
  { code: 'ar', label: 'العربية' },
];

export default function Home() {
  const user = useAppSelector<User>(selectUser);
  const colorScheme = useColorScheme();
  const preferredLocale = useAppSelector(selectPreferredLocale);
  const preferredColorScheme = useAppSelector(selectPreferredColorScheme);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [verifyMessageInfo, setVerifyMessageInfo] = useState<string>('');
  const [isLoadingMessage, setIsLoadingMessage] = useState<boolean>(true);
  const [languageDropdownVisible, setLanguageDropdownVisible] = useState(false);
  const iconColor = Colors[colorScheme ?? 'light'].text;

  const onLogout = async () => {
    await removeItem(StorageKeys.phoneNumber);
    dispatch(setIsLoggedIn(false));
    dispatch(resetUser());
    router.replace('/AuthPhoneEntry');
  };

  const renderLogoutButton = () => (
    <Pressable
      onPress={onLogout}
      style={[styles.logoutButton, { marginTop: 24 }]}
      hitSlop={12}
      accessibilityLabel={i18n.t('auth_logout')}
    >
      <MaterialIcons name="logout" size={24} color={iconColor} />
    </Pressable>
  );

  const selectLocale = (code: string) => {
    const locale = code === 'iw' ? 'he' : code;
    dispatch(setPreferredLocale(locale));
    i18n.locale = locale;
    setItem(StorageKeys.preferredLocale, code);
    setLanguageDropdownVisible(false);
  };

  const toggleTheme = () => {
    const next: ColorSchemePreference = preferredColorScheme === 'dark' ? 'light' : 'dark';
    dispatch(setPreferredColorScheme(next));
    setItem(StorageKeys.preferredColorScheme, next);
    if (typeof Appearance?.setColorScheme === 'function') {
      Appearance.setColorScheme(next);
    }
  };

  useEffect(() => {
    const loadVerificationMessage = async () => {
      try {
        setIsLoadingMessage(true);
        const response = await fetchVerificationMessage(user.communityId);
        if ('data' in response && response.data) {
          setVerifyMessageInfo(response.data.message);
        } else {
          setVerifyMessageInfo(`חברי קהילה יקרים, 
ברוכים הבאים לאפליקצית לירה שפירא! 
על מנת להפעיל את חשבונכם יש ליצור קשר עם אחד מאנשי הקהילה לשיחת הכירות.`);
        }
      } catch (error) {
        console.error('Error fetching verification message:', error);
        setVerifyMessageInfo(`חברי קהילה יקרים, 
ברוכים הבאים לאפליקצית לירה שפירא! 
על מנת להפעיל את חשבונכם יש ליצור קשר עם אחד מאנשי הקהילה לשיחת הכירות.`);
      } finally {
        setIsLoadingMessage(false);
      }
    };

    if (user.isVerified !== true) {
      loadVerificationMessage();
    }
  }, [user.isVerified, user.communityId]);

  useEffect(() => {
    if (!user.communityId) {
      return;
    }

    let cancelled = false;

    const loadCommunityCoin = async () => {
      try {
        const response = await fetchCommunityById(user.communityId!);
        if (cancelled || !('data' in response) || !response.data) {
          return;
        }

        const coin = response.data.Coin?.trim();
        if (coin) {
          dispatch(setCommunityCoin(coin));
        }
      } catch (error) {
        console.error('Error fetching community coin:', error);
      }
    };

    loadCommunityCoin();

    return () => {
      cancelled = true;
    };
  }, [user.communityId, dispatch]);

  if (user.isBanned === true) {
    return (
      <View style={[styles.container, styles.messageContainer]}>
        {renderLogoutButton()}
        <Text style={[styles.messageText, { color: Colors[colorScheme ?? 'light'].text }]}>
          This account is banned.
        </Text>
      </View>
    );
  }

  if (user.isVerified !== true) {
    return (
      <GradientContainer styles={styles.container}>
        {renderLogoutButton()}
        <RNView
          style={[
            styles.messageContainer,
            {
              flex: 1,
              alignItems: 'center',
              width: '100%',
              backgroundColor: 'transparent',
            },
          ]}
        >
          {isLoadingMessage ? (
            <Text style={[styles.messageText, { color: Colors[colorScheme ?? 'light'].text }]}>
              Loading...
            </Text>
          ) : (
            <Text style={[styles.messageText, { color: Colors[colorScheme ?? 'light'].text }]}>
              {verifyMessageInfo}
            </Text>
          )}
        </RNView>
      </GradientContainer>
    );
  }

  const colors = Colors[colorScheme ?? 'light'];
  return (
    <RNView style={styles.container}>
      {renderLogoutButton()}
      {languageDropdownVisible && (
        <>
          <Pressable
            style={styles.dropdownBackdrop}
            onPress={() => setLanguageDropdownVisible(false)}
          />
          <RNView style={[styles.dropdown, { backgroundColor: colors.background }]}>
            {SUPPORTED_LOCALES.map(({ code, label }) => (
              <Pressable
                key={code}
                style={({ pressed }) => [
                  styles.dropdownItem,
                  { backgroundColor: pressed ? colors.shading : 'transparent' },
                ]}
                onPress={() => selectLocale(code)}
              >
                <Text style={[styles.dropdownItemText, { color: colors.text }]}>
                  {label}
                </Text>
              </Pressable>
            ))}
          </RNView>
        </>
      )}
      <RNView style={[styles.settingsBar, { marginTop: 24 }]}>
        <Pressable
          onPress={() => setLanguageDropdownVisible((v) => !v)}
          style={styles.settingsButton}
          hitSlop={12}
        >
          <FontAwesome name="language" size={24} color={iconColor} />
        </Pressable>
        <Pressable onPress={toggleTheme} style={styles.settingsButton} hitSlop={12}>
          <MaterialIcons
            name={preferredColorScheme === 'dark' ? 'light-mode' : 'dark-mode'}
            size={24}
            color={iconColor}
          />
        </Pressable>
      </RNView>
      <GradientContainer styles={{ ...styles.gradientHeader, ...styles.gradientHeaderStraddle }}>
        <Dashboard includeButtons={false} />
      </GradientContainer>

      <RNView style={styles.buttonsStraddle}>
        <ButtonGroup />
      </RNView>

      <ScrollView
        style={styles.mainScrollView}
        contentContainerStyle={styles.mainScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <RNView
          style={{
            paddingTop: 75,
            paddingBottom: 10,
            zIndex: 0,
            width: '100%',
            position: 'relative',
          }}
        >
          <RequestCard />
        </RNView>
        <Text style={{ fontSize: 40 }}>{i18n.t('home_transactions_title')}</Text>
        <TransactionsList currentUser={user} />
      </ScrollView>
    </RNView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  settingsBar: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    flexDirection: 'row',
    gap: 8,
  },
  settingsButton: {
    padding: 8,
  },
  logoutButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 10,
    padding: 8,
  },
  dropdownBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9,
  },
  dropdown: {
    position: 'absolute',
    top: 76,
    right: 12,
    zIndex: 11,
    minWidth: 140,
    borderRadius: 8,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownItemText: {
    fontSize: 16,
  },
  mainScrollView: {
    flex: 1,
    minHeight: 0,
    width: '100%',
  },
  mainScrollContent: {
    paddingBottom: 88,
  },
  gradientHeader: {
    height: 'auto',
  },
  gradientHeaderStraddle: {
    paddingBottom: 95,
  },
  buttonsStraddle: {
    marginTop: -95,
    zIndex: 1,
  },
  messageContainer: {
    justifyContent: 'center',
    padding: 20,
  },
  messageText: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
  },
});
