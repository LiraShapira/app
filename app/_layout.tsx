import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { createContext, useEffect, useState } from 'react';
import * as Contacts from 'expo-contacts';
import { Contact } from 'expo-contacts';
import { Provider } from 'react-redux';
import { store } from '../store';
import { loadUser, selectUserLoading, setUser } from '../store/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectDepositFormLoading } from '../store/depositFormSlice';
import LoadingPage from '../components/utils/LoadingPage';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export const contactsContext = createContext<Contact[]>([]);

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.FirstName,
            Contacts.Fields.LastName,
            Contacts.Fields.PhoneNumbers,
          ],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  return (
    <>
      <Provider store={store}>
        <contactsContext.Provider value={contacts}>
          {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
          {!loaded && <SplashScreen />}
          {loaded && <RootLayoutNav />}
        </contactsContext.Provider>
      </Provider>
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const userLoading = useAppSelector(selectUserLoading);
  const depositFormLoading = useAppSelector(selectDepositFormLoading);

  useEffect(() => {
    dispatch(loadUser('test'))
      .unwrap()
      .then((user) => {
        dispatch(setUser(user));
      });
  });

  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {depositFormLoading || userLoading ? (
          <LoadingPage />
        ) : (
          <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          </Stack>
        )}
      </ThemeProvider>
    </>
  );
}
