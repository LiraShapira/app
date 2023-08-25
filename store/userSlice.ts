import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from '../types/User';
import { fetchUser, saveTransactionToDatabase } from '../API/userAPI';
import { Transaction } from '../types/Transaction';


interface initialState {
  user: User;
  loading: boolean;
}

const initialState: initialState = {
  user: {
    accountBalance: 0,
    dateJoined: new Date().toDateString(),
    userID: '',
    transactions: [],
    userLocalCompostStand: 1,
    userName: '',
  },
  loading: false
};


export const loadUser = createAsyncThunk<
  User,
  string,
  { state: RootState }
>('user/fetchUser',
  async (userPhoneNumber: string) => {
    const { data } = await fetchUser(userPhoneNumber);
    return data;
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {

    }
  },
  extraReducers: builder => {
    builder.addCase(saveTransaction.fulfilled, (state, action) => {
      state.user.transactions.push(action.payload);
    })
  //   builder
  //     .addCase(loadUser.pending, state => {
  //       state.loading = true;
  //     })
  //     .addCase(loadUser.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.user = action.payload;
  //     });
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserId = (state: RootState) => state.user.user.userID;
export const selectUserLoading = (state: RootState) => state.user.loading;

export default userSlice.reducer;
