import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { fetchUser, registerNewUser } from '../API/userAPI';
import { setItem } from '../utils/asyncStorage';
import { setUser } from './userSlice';
import { User } from '../types/User';
import { StorageKeys } from '../types/AsyncStorage';
import { SuccessApiResponse } from '../types/APITypes';
import { parsePhoneNumber } from 'libphonenumber-js';

interface AuthForm {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  communityId: string;
}
interface AuthFormState extends AuthForm {
  loading: boolean;
  isLoggedIn: boolean;
}

const initialState: AuthFormState = {
  firstName: '',
  lastName: '',
  phoneNumber: '05',
  communityId: '',
  loading: false,
  isLoggedIn: false,
};

export const sendLoginForm = createAsyncThunk<
  SuccessApiResponse<User>,
  undefined,
  { state: RootState }
>('authForm/sendLoginForm', async (_u, { getState, dispatch }): Promise<SuccessApiResponse<User>> => {
  const { phoneNumber } = getState().authForm;
  // send number in format 5******** (9 digits)
  const parsedPhoneNumber = parsePhoneNumber(phoneNumber, 'IL').nationalNumber;
  const response = await fetchUser(parsedPhoneNumber);
  if (!('data' in response)) {
    throw new Error(response.message)
  }
  if (response.data) {
    dispatch(resetForm());
    dispatch(setUser(response.data))
    return response;
  } else {
    throw new Error('User not found');
  }
});

export const sendRegistrationForm = createAsyncThunk<
  SuccessApiResponse<User>,
  string | undefined,
  { state: RootState }
>('authForm/sendRegistrationForm', async (_userId: string | undefined, { getState, dispatch }): Promise<SuccessApiResponse<User>> => {
  const { phoneNumber, firstName, lastName, communityId } = getState().authForm;
  if (!communityId) {
    throw new Error('Please select a community');
  }
  // send number in format 5******** (9 digits)
  const parsedPhoneNumber = parsePhoneNumber(phoneNumber, 'IL').nationalNumber;
  const response = await registerNewUser({ phoneNumber: parsedPhoneNumber, firstName, lastName, communityId });
  if (!('data' in response)) {
    throw new Error(response.message);
  }
  if (response.data) {
    dispatch(resetForm());
    dispatch(setUser(response.data));
    return response;
  } else {
    throw new Error('User not found');
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
    setCommunityId: (state, action: PayloadAction<string>) => {
      state.communityId = action.payload;
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
      .addCase(sendLoginForm.pending, state => {
        state.loading = true;
      })
      .addCase(sendLoginForm.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendLoginForm.rejected, (state) => {
        state.loading = false;
      })
      .addCase(sendRegistrationForm.pending, state => {
        state.loading = true;
      })
      .addCase(sendRegistrationForm.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendRegistrationForm.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setFirstName,
  setLastName,
  setPhoneNumber,
  setCommunityId,
  resetForm,
  setIsLoggedIn,
} = authFormSlice.actions;

export const selectFirstName = (state: RootState) => state.authForm.firstName


export const selectLastName = (state: RootState) => state.authForm.lastName


export const selectPhoneNumber = (state: RootState) => state.authForm.phoneNumber;

export const selectCommunityId = (state: RootState) => state.authForm.communityId;

export const selectIsLoggedIn = (state: RootState) => state.authForm.isLoggedIn;

export const selectAuthFormLoading = (state: RootState) => state.authForm.loading;

export default authFormSlice.reducer;
