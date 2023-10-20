import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { fetchUser } from '../API/userAPI';
import {setItem} from '../utils/asyncStorage';
import { setUser } from './userSlice';

interface AuthForm {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  
}
interface AuthFormState extends AuthForm {
  loading: boolean;
}

const initialState: AuthFormState = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  loading: false,
};

export const sendAuthForm = createAsyncThunk<
  string | false,
  string,
  { state: RootState }
>('authForm/sendAuthForm', async (userId: string | undefined, { getState, dispatch }) => {
  const form = getState().authForm;
  console.log({userId})
  try {
    const response = await fetchUser(form);
    dispatch(resetForm());
    console.log(response)
    setItem("phoneNumber", response.phoneNumber)
    dispatch(setUser(response))
    

    return response;

  } catch (e) {
    console.log(e);
    return false;
  }
});

const authFormSlice = createSlice({
  name: 'authForm',
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      console.log("here.", action.payload)
      state.firstName = action.payload;
      console.log("being called", state.firstName)
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
      console.log("being called", state)
    },
    resetForm: (state) => {
      status = {
        ...initialState
      }
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
  resetForm
} = authFormSlice.actions;

const rootSelector = (state: RootState) => state.authForm;
export const selectAuthFormLoading = (state: RootState) => createSelector(
  rootSelector,
  state => state.loading
);

export const selectFirstName = (state: RootState) => createSelector(
  rootSelector,
  state => state.firstName
);

export const selectLastName = (state: RootState) => createSelector(
  rootSelector,
  state => state.lastName
);

export const selectPhoneNumber = (state: RootState) => createSelector(
  rootSelector,
  state => state.phoneNumber
);

export default authFormSlice.reducer;
