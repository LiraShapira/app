import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { fetchUser } from '../API/userAPI';
import { setItem } from '../utils/asyncStorage';
import { setUser } from './userSlice';
import { User } from '../types/User';
import { StorageKeys } from '../types/AsyncStorage';

interface AuthForm {
  firstName: string;
  lastName: string;
  phoneNumber: string;

}
interface AuthFormState extends AuthForm {
  loading: boolean;
  isLoggedIn: boolean;
}

const initialState: AuthFormState = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  loading: false,
  isLoggedIn: false,
};

export const sendAuthForm = createAsyncThunk<
  User | void,
  string | undefined,
  { state: RootState }
>('authForm/sendAuthForm', async (_userId: string | undefined, { getState, dispatch }) => {
  const { phoneNumber, firstName, lastName } = getState().authForm;
  try {
    const user = await fetchUser({ phoneNumber, firstName, lastName });
    if (user) {
      dispatch(resetForm());
      setItem(StorageKeys.phoneNumber, user.phoneNumber)
      dispatch(setUser(user))
      return user;
    } else {
      throw new Error('User not found');
    }
  } catch (e) {
    console.log(e);
  }
});

const authFormSlice = createSlice({
  name: 'authForm',
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    resetForm: (state) => {
      state = initialState;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(sendAuthForm.pending, state => {
        state.loading = true;
      })
      .addCase(sendAuthForm.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setFirstName,
  setLastName,
  setPhoneNumber,
  resetForm,
  setIsLoggedIn,
} = authFormSlice.actions;

export const selectFirstName = (state: RootState) => state.authForm.firstName


export const selectLastName = (state: RootState) => state.authForm.lastName


export const selectPhoneNumber = (state: RootState) => state.authForm.phoneNumber


export const selectIsLoggedIn = (state: RootState) => state.authForm.isLoggedIn;

export const selectAuthFormLoading = (state: RootState) => state.authForm.loading;

export default authFormSlice.reducer;
