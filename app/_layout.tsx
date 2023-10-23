import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import { Platform, useColorScheme } from 'react-native';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { loadContacts, loadUser, selectUserLoading, setIsUserLoading, setUser } from '../store/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
// import OnLoad from '../components/utils/OnLoad';
import { getItem } from '../utils/asyncStorage';
import { StorageKeys } from '../types/AsyncStorage';
import { selectAuthFormLoading, selectIsLoggedIn, setIsLoggedIn } from '../store/authFormSlice';
import Auth from './Auth';
import LoadingPage from '../components/utils/LoadingPage';
import { selectDepositFormLoading } from '../store/depositFormSlice';
import { selectSendFormLoading } from '../store/sendFormSlice';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      <Provider store={store}>
        {!loaded && <Slot />}
        {loaded && <RootLayoutNav />}
      </Provider>
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isUserLoading = useAppSelector(selectUserLoading);
  const isAuthLoading = useAppSelector(selectAuthFormLoading);
  const isDepositFormLoading = useAppSelector(selectDepositFormLoading);
  const isSendFormLoading = useAppSelector(selectSendFormLoading);

  useEffect(() => {
    dispatch(loadContacts());
  });
  
  useEffect(() => {
    dispatch(setIsUserLoading(true))
    
    if (Platform.OS === 'web') {
      const phoneNumber = localStorage.getItem('phoneNumber');
      // if previously logged in, a phoneNumber will be stored in localStorage
      // we retrieve this to load the user
      if (phoneNumber) {
        dispatch(loadUser({ phoneNumber }))
          .unwrap()
          .then((user) => {
            if (user) {
              dispatch(setUser(user));
              localStorage.setItem('phoneNumber', user.phoneNumber);
              dispatch(setIsLoggedIn(true));
            }
          });
      }
    } else {
      getItem(StorageKeys.phoneNumber).then((phoneNumber) => {
        if (phoneNumber) {
          dispatch(loadUser({ phoneNumber }))
            .unwrap()
            .then((user) => {
              if (user) {
                dispatch(setUser(user));
                dispatch(setIsLoggedIn(true));
              }
            });
        }
      });
    }

    dispatch(setIsUserLoading(false));
  }, []);

  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <LoadingPage loading={isUserLoading || isAuthLoading || isDepositFormLoading || isSendFormLoading}> 
        {isLoggedIn ? (
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        ) : (
          <Auth />
          )}
          </LoadingPage>
      </ThemeProvider>
    </>
  );
}
