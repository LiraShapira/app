import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { FetchUserArgs, User, UserRole } from '../types/User';
import { fetchUser, saveTransactionToDatabase } from '../API/userAPI';
import { Transaction } from '../types/Transaction';
import { fetchContacts } from '../API/contactsAPI';
import { Contact } from 'expo-contacts';


interface initialState {
  user: User;
  contacts: Contact[];
  loading: boolean;
}

const initialState: initialState = {
  user: {
    accountBalance: 0,
    createdAt: new Date().toDateString(),
    id: '',
    transactions: [],
    userLocalCompostStandId: 1,
    lastName: '',
    firstName: '',
    phoneNumber: '',
    role: UserRole.BASIC
  },
  contacts: [],
  loading: false
};


export const loadUser = createAsyncThunk<
  User | void,
  FetchUserArgs,
  { state: RootState }
>('user/fetchUser',
  async (fetchUserArgs: FetchUserArgs) => {
    try {
      const user = await fetchUser(fetchUserArgs);
      if (user) {
        return user;
      } else {
        throw new Error('failure to get user')
      }
    } catch (e) {
    }
  });

interface saveTransactionArgs {
  transaction: Transaction;
  userID: string;
}

export const saveTransaction = createAsyncThunk<
  Transaction,
  saveTransactionArgs,
  { state: RootState }
>('user/saveTransaction',
  async ({ userID, transaction }: saveTransactionArgs) => {
    const { data } = await saveTransactionToDatabase(userID, transaction);
    return data;
  });

export const loadContacts = createAsyncThunk<
  Contact[],
  void,
  { state: RootState }
>('user/fetchContacts',
  async () => {
    const contacts = await fetchContacts();
    return contacts;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(saveTransaction.fulfilled, (state, action) => {
      if (!state.user.transactions) state.user.transactions = [];
      state.user.transactions.push(action.payload);
    })
    builder
      .addCase(loadContacts.fulfilled, (state, action) => {
        state.contacts = action.payload; // Update contacts directly on the slice
      });
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(loadUser.pending, state => {
  //       state.loading = true;
  //     })
  //     .addCase(loadUser.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.user = action.payload;
  //     });
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserId = (state: RootState) => state.user.user.id;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectContacts = (state: RootState) => state.user.contacts;

export default userSlice.reducer;
