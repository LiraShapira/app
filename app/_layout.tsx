import '../app/typography';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack, useRouter } from 'expo-router';
import { Appearance, Platform, useColorScheme, StatusBar } from 'react-native';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  loadUser,
  selectUserLoading,
  setIsUserLoading,
  setUser,
} from '../store/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getItem } from '../utils/asyncStorage';
import { StorageKeys } from '../types/AsyncStorage';
import { selectAuthFormLoading, setIsLoggedIn } from '../store/authFormSlice';
import LoadingPage from '../components/utils/LoadingPage';
import { selectDepositFormLoading } from '../store/depositFormSlice';
import { selectSendFormLoading } from '../store/sendFormSlice';
import { selectIsAppLoading } from '../store/appStateSlice';
import {
  setPreferredLocale,
  setPreferredColorScheme,
  selectPreferredColorScheme,
} from '../store/preferencesSlice';
import i18n from '../translationService';
import React from 'react';
import { depositLogger } from '../utils/depositLogger';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {Platform.OS === 'ios' ? (
        <SafeAreaProvider>
          <Provider store={store}>
            {!loaded && <Slot />}
            {loaded && <RootLayoutNav />}
          </Provider>
        </SafeAreaProvider>
      ) : (
        <Provider store={store}>
          {!loaded && <Slot />}
          {loaded && <RootLayoutNav />}
        </Provider>
      )}
    </>
  );
}

function RootLayoutNav() {
  const systemColorScheme = useColorScheme();
  const preferredColorScheme = useAppSelector(selectPreferredColorScheme);
  const colorScheme = preferredColorScheme ?? systemColorScheme ?? 'light';
  const dispatch = useAppDispatch();
  const isUserLoading = useAppSelector(selectUserLoading);
  const isAuthLoading = useAppSelector(selectAuthFormLoading);
  const isDepositFormLoading = useAppSelector(selectDepositFormLoading);
  const isSendFormLoading = useAppSelector(selectSendFormLoading);
  const isAppLoading = useAppSelector(selectIsAppLoading);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const [savedLocale, savedScheme] = await Promise.all([
        getItem(StorageKeys.preferredLocale),
        getItem(StorageKeys.preferredColorScheme),
      ]);
      if (savedLocale != null) {
        const locale = savedLocale === 'iw' ? 'he' : savedLocale;
        dispatch(setPreferredLocale(locale));
        i18n.locale = locale;
      }
      if (savedScheme === 'light' || savedScheme === 'dark') {
        dispatch(setPreferredColorScheme(savedScheme));
        if (typeof Appearance?.setColorScheme === 'function') {
          Appearance.setColorScheme(savedScheme);
        }
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    depositLogger.warnIfPreviousFlowIncomplete();
    dispatch(setIsUserLoading(true));
    
    if (Platform.OS === 'web') {
      const phoneNumber = localStorage.getItem('phoneNumber');
      if (phoneNumber) {
        dispatch(loadUser(phoneNumber))
        .unwrap()
        .then(({ data: user }) => {
          if (user) {
            dispatch(setUser(user));
            dispatch(setIsLoggedIn(true));
            router.push(Platform.OS === 'web' ? '/Home' : '/(tabs)/Home');
          }
        });
      } else { 
        dispatch(setIsUserLoading(false));
        router.push('/AuthPhoneEntry');
      }
    } else {
      getItem(StorageKeys.phoneNumber).then((phoneNumber) => {
        if (phoneNumber) {
          dispatch(loadUser(phoneNumber))
            .unwrap()
            .then(({ data: user }) => {
              if (user) {
                dispatch(setUser(user));
                dispatch(setIsLoggedIn(true));
                router.push('/(tabs)/Home');
              }
            });
        } else {
          dispatch(setIsUserLoading(false));
          router.push('/AuthPhoneEntry');
        }
      });
    }
  }, []);

  return (
    <>
      {Platform.OS === 'ios' && (
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          translucent={false}
        />
      )}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <LoadingPage
          loading={
            isUserLoading ||
            isAuthLoading ||
            isAppLoading ||
            isDepositFormLoading ||
            isSendFormLoading
          }
        />
        <Stack>
          <Stack.Screen
            name='AuthPhoneEntry'
            options={{ headerShown: false }}
          />
          <Stack.Screen name='AuthNameEntry' options={{ headerShown: false }} />
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='SellerOptions' options={{ headerShown: false }} />
          <Stack.Screen name='Send' options={{ headerShown: false }} />
          <Stack.Screen name='CompostReport' options={{ headerShown: false }} />
          <Stack.Screen name='SendAmount' options={{headerShown:false}}/>
          <Stack.Screen name='SendReason' options={{headerShown:false}}/>
        </Stack>
      </ThemeProvider>
    </>
  );
}
