import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User, UserRole } from '../types/User';
import { fetchUser, fetchUserIdByNumber, fetchAllUsers } from '../API/userAPI';
import { Transaction } from '../types/Transaction';
import { SuccessApiResponse } from '../types/APITypes';
import { updateRequestInDatabase } from '../API/transactionAPI';

interface UserState {
  user: User;
  users: User[];
  loading: boolean;
  isConnected: boolean;
}

const initialState: UserState = {
  user: {
    accountBalance: 0,
    createdAt: new Date().toISOString(),
    id: '',
    transactions: [],
    userLocalCompostStandId: 1,
    lastName: '',
    firstName: '',
    phoneNumber: '',
    role: UserRole.BASIC,
  },
  users: [],
  loading: false,
  isConnected: false,
};

export const loadUser = createAsyncThunk<
  SuccessApiResponse<User>,
  string,
  { state: RootState }
>('user/loadUser', async (phoneNumber: string) => {
  const response = await fetchUser(phoneNumber);
  if (!('data' in response)) {
    throw new Error(response.message);
  }
  if (response.data) {
    return response;
  } else {
    throw new Error('User not found');
  }
});

export const loadAllUsers = createAsyncThunk<
  User[],
  void,
  { state: RootState }
>('user/loadAllUsers', async (_arg, { getState }) => {
  const communityId = getState().user.user.communityId;
  const response = await fetchAllUsers(communityId);
  if (!('data' in response)) {
    throw new Error(response.message || 'Failed to fetch users');
  }
  return response.data;
});

export const getUserIdByNumber = createAsyncThunk<
  SuccessApiResponse<{ userId: string }>,
  string,
  { state: RootState }
>('user/getUserIdByNumber', async (phoneNumber: string) => {
  const response = await fetchUserIdByNumber(phoneNumber);
  if (!('data' in response)) {
    throw new Error(response.message);
  }
  if (response.data) {
    return response;
  } else {
    throw new Error('User not found');
  }
});

interface handleRequestArgs {
  transaction: Transaction;
  isRequestAccepted: boolean;
}

export const handleRequest = createAsyncThunk<
  SuccessApiResponse<Transaction>,
  handleRequestArgs,
  { state: RootState }
>('user/handleRequest', async (handleRequestArgs) => {
  const response = await updateRequestInDatabase(handleRequestArgs);
  if (!('data' in response)) {
    throw new Error(response.message);
  }
  if (response.data) {
    return response;
  } else {
    throw new Error('User not found');
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      if (typeof action.payload.accountBalance === 'string') {
        state.user.accountBalance = parseFloat(action.payload.accountBalance);
      } else {
        state.user.accountBalance = action.payload.accountBalance;
      }
      // Ensure transactions is always an array
      if (!state.user.transactions) {
        state.user.transactions = [];
      }
      // Ensure all transactions have a users array to prevent crashes
      state.user.transactions = state.user.transactions.map(t => ({
        ...t,
        users: Array.isArray(t.users) ? t.users : []
      }));
    },
    addUserTransaction: (state, action: PayloadAction<Transaction>) => {
      if (!state.user.transactions) {
        state.user.transactions = [];
      }
      // Ensure the transaction has a users array (even if empty) to prevent crashes
      const transaction = {
        ...action.payload,
        users: Array.isArray(action.payload.users) ? action.payload.users : []
      };
      state.user.transactions.push(transaction);
    },
    setIsUserLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUserBalance: (state, action: PayloadAction<number | string>) => {
      if (typeof action.payload === 'string') {
        state.user.accountBalance = parseFloat(action.payload);
      } else {
        state.user.accountBalance = action.payload;
      }
    },
    incrementUserBalance: (state, action: PayloadAction<number | string>) => {
      console.log('incrementUserBalance called with:', action.payload, 'Type:', typeof action.payload);
      console.log('Current balance:', state.user.accountBalance, 'Type:', typeof state.user.accountBalance);
      
      // Ensure current balance is a number
      const currentBalance = typeof state.user.accountBalance === 'string' 
        ? parseFloat(state.user.accountBalance) 
        : state.user.accountBalance;
      
      // Ensure amount to add is a number
      const amountToAdd = typeof action.payload === 'string' 
        ? parseFloat(action.payload) 
        : action.payload;
      
      console.log('Current balance (as number):', currentBalance);
      console.log('Amount to add (as number):', amountToAdd);
      
      state.user.accountBalance = currentBalance + amountToAdd;
      console.log('New balance:', state.user.accountBalance, 'Type:', typeof state.user.accountBalance);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(handleRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleRequest.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(handleRequest.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setUser,
  addUserTransaction,
  setUserBalance,
  setIsUserLoading,
  incrementUserBalance,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserId = (state: RootState) => state.user.user.id;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectAllUsers = (state: RootState) => state.user.users;

export default userSlice.reducer;
