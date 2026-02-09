import { ScrollView, StyleSheet, Pressable, Appearance } from 'react-native';
import { Text, View } from '../../components/Themed';
import TransactionsList from '../../components/transactions/TransactionsList';
import Dashboard from '../../components/home/Dashboard';
import i18n from '../../translationService';
import { selectUser } from '../../store/userSlice';
import { selectTheme, selectLocale, setTheme, setLocale } from '../../store/appStateSlice';
import { useAppSelector, useAppDispatch } from '../../hooks';
import GradientContainer from '../../components/utils/GradientContainer';
import RequestCard from '../../components/requests/RequestCard';
import { User } from '../../types/User';
import { useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import { useState, useEffect } from 'react';
import { fetchVerificationMessage } from '../../API/verificationMessageAPI';

const LOCALE_ORDER = ['en', 'he', 'ar'] as const;

export default function Home() {
  const user = useAppSelector<User>(selectUser);
  const colorScheme = useColorScheme();
  const theme = useAppSelector(selectTheme);
  const locale = useAppSelector(selectLocale);
  const dispatch = useAppDispatch();
  const [verifyMessageInfo, setVerifyMessageInfo] = useState<string>('');
  const [isLoadingMessage, setIsLoadingMessage] = useState<boolean>(true);

  // Apply theme preference to the app
  useEffect(() => {
    Appearance.setColorScheme(theme);
  }, [theme]);

  // Keep i18n in sync with app locale
  useEffect(() => {
    if (locale && i18n.locale !== locale) {
      i18n.locale = locale;
    }
  }, [locale]);

  useEffect(() => {
    const loadVerificationMessage = async () => {
      try {
        setIsLoadingMessage(true);
        const response = await fetchVerificationMessage(user.communityId);
        if ('data' in response && response.data) {
          setVerifyMessageInfo(response.data.message);
        } else {
          // Fallback to default message if API fails
          setVerifyMessageInfo(`חברי קהילה יקרים, 
ברוכים הבאים לאפליקצית לירה שפירא! 
על מנת להפעיל את חשבונכם יש ליצור קשר עם אחד מאנשי הקהילה לשיחת הכירות.`);
        }
      } catch (error) {
        console.error('Error fetching verification message:', error);
        // Fallback to default message on error
        setVerifyMessageInfo(`חברי קהילה יקרים, 
ברוכים הבאים לאפליקצית לירה שפירא! 
על מנת להפעיל את חשבונכם יש ליצור קשר עם אחד מאנשי הקהילה לשיחת הכירות.`);
      } finally {
        setIsLoadingMessage(false);
      }
    };

    // Only fetch if user is not verified
    if (user.isVerified !== true) {
      loadVerificationMessage();
    }
  }, [user.isVerified, user.communityId]);

  // Check if user is banned
  if (user.isBanned === true) {
    return (
      <View style={[styles.container, styles.messageContainer]}>
        <Text style={[styles.messageText, { color: Colors[colorScheme ?? 'light'].text }]}>
          This account is banned.
        </Text>
      </View>
    );
  }

  // Check if user is not verified (isVerified is false or null)
  if (user.isVerified !== true) {
    return (
      <View style={[styles.container, styles.messageContainer]}>
        {isLoadingMessage ? (
          <Text style={[styles.messageText, { color: Colors[colorScheme ?? 'light'].text }]}>
            Loading...
          </Text>
        ) : (
          <Text style={[styles.messageText, { color: Colors[colorScheme ?? 'light'].text }]}>
            {verifyMessageInfo}
          </Text>
        )}
      </View>
    );
  }

  const onLanguagePress = () => {
    const idx = LOCALE_ORDER.indexOf((locale || 'en') as typeof LOCALE_ORDER[number]);
    const nextLocale = LOCALE_ORDER[(idx + 1) % LOCALE_ORDER.length];
    dispatch(setLocale(nextLocale));
    i18n.locale = nextLocale;
  };

  const onThemePress = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  // User is verified and not banned - show normal dashboard
  return (
    <View style={styles.container}>
      <GradientContainer styles={{ height: 'auto' }}>
        <View style={styles.settingsRow}>
          <Pressable
            onPress={onLanguagePress}
            style={({ pressed }) => [
              styles.settingsButton,
              { backgroundColor: Colors[colorScheme ?? 'light'].highlight, opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <Text style={[styles.settingsButtonText, { color: Colors[colorScheme ?? 'light'].text }]}>
              {i18n.t('settings_language')}: {locale || 'en'}
            </Text>
          </Pressable>
          <Pressable
            onPress={onThemePress}
            style={({ pressed }) => [
              styles.settingsButton,
              { backgroundColor: Colors[colorScheme ?? 'light'].highlight, opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <Text style={[styles.settingsButtonText, { color: Colors[colorScheme ?? 'light'].text }]}>
              {i18n.t('settings_theme')}: {theme === 'light' ? i18n.t('settings_theme_light') : i18n.t('settings_theme_dark')}
            </Text>
          </Pressable>
        </View>
        <Dashboard />
      </GradientContainer>

      <View
        style={{
          paddingTop: 75,
          paddingBottom: 10,
          zIndex: 0,
          width: '100%',
          position: 'relative',
          height: 'auto',
        }}
      >
        <RequestCard />
      </View>
      <Text style={[styles.transactionsTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
        {i18n.t('home_transactions_title')}
      </Text>
      <ScrollView style={{ width: '100%' }}>
        <TransactionsList currentUser={user} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  settingsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  settingsButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  settingsButtonText: {
    fontSize: 14,
  },
  transactionsTitle: {
    fontSize: 40,
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
  dashboardContainer: {
    width: '100%',
  },
  icon: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: 'grey',
    borderRadius: 50,
    fontSize: 40,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
