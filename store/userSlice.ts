import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User, UserRole } from "../types/User";
import { fetchUser } from "../API/userAPI";
import { Transaction } from "../types/Transaction";
import { fetchContacts } from "../API/contactsAPI";
import { Contact } from "expo-contacts";
import { SuccessApiResponse } from "../types/APITypes";

interface UserState {
  user: User;
  contacts: Contact[];
  loading: boolean;
  isConnected: boolean;
}

const initialState: UserState = {
  user: {
    accountBalance: 0,
    createdAt: new Date().toDateString(),
    id: "",
    transactions: [],
    userLocalCompostStandId: 1,
    lastName: "",
    firstName: "",
    phoneNumber: "",
    role: UserRole.BASIC,
  },
  contacts: [],
  loading: false,
  isConnected: false,
};

export const loadUser = createAsyncThunk<
  SuccessApiResponse<User>,
  string,
  { state: RootState }
>("user/fetchUser", async (phoneNumber: string) => {
  const response = await fetchUser(phoneNumber);
  if (!('data' in response)) {
    throw new Error(response.message)
  }
  if (response.data) {
    return response;
  } else {
    throw new Error('User not found');
  }
});

export const loadContacts = createAsyncThunk<
  Contact[],
  void,
  { state: RootState }
>("user/fetchContacts", async () => {
  const contacts = await fetchContacts();
  return contacts;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      if (typeof action.payload.accountBalance === 'string') {
        state.user.accountBalance = parseInt(action.payload.accountBalance)
      } else {
        state.user.accountBalance = action.payload.accountBalance
      }
    },
    addUserTransaction: (state, action: PayloadAction<Transaction>) => {
      state.user.transactions.push(action.payload);
    },
    setIsUserLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUserBalance: (state, action: PayloadAction<number | string>) => {
      if (typeof action.payload === 'string') {
        state.user.accountBalance = parseInt(action.payload)
      } else {
        state.user.accountBalance = action.payload
      }
    },
    incrementUserBalance: (state, action: PayloadAction<number | string>) => {
      if (typeof action.payload === 'string') {
        state.user.accountBalance += parseInt(action.payload)
      } else {
        state.user.accountBalance += action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadContacts.fulfilled, (state, action) => {
        state.contacts = action.payload; // Update contacts directly on the slice
      })
      .addCase(loadUser.pending, state => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { setUser, addUserTransaction, setUserBalance, setIsUserLoading, incrementUserBalance } =
  userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserId = (state: RootState) => state.user.user.id;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectContacts = (state: RootState) => state.user.contacts;
export const selectIsConnected = (state: RootState) => state.user.isConnected;

export default userSlice.reducer;
