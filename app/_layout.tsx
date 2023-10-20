import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import {
  loadContacts,
  loadUser,
  onLoad,
  selectUserLoading,
  setUser,
} from '../store/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectDepositFormLoading } from '../store/depositFormSlice';
import LoadingPage from '../components/utils/LoadingPage';
import { FetchUserArgs } from '../types/User';
import OnLoad from '../components/utils/OnLoad';
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
  console.log("being called")
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  // const userLoading = useAppSelector(selectUserLoading);
  const depositFormLoading = useAppSelector(selectDepositFormLoading);


  // useEffect(() => {
  //   const test: FetchUserArgs = {
  //     firstName: 'johnny',
  //     lastName: 'test',
  //     phoneNumber: '123456789',
  //   };

  //   dispatch(loadUser(test))
  //     .unwrap()
  //     .then((user) => {
  //       if (!user) {
  //         console.log('failed to load user');
  //       } else {
  //         dispatch(setUser(user));
  //       }
  //     });
  // }, []);
  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
      <OnLoad />
    </>
  );
}
