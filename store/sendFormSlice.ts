import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { Contact } from 'expo-contacts';
import {
  Category,
  saveTransactionArgs,
} from '../types/Transaction';
import {
  TransactionWithUsers,
  saveTransactionToDatabase,
} from '../API/transactionAPI';

interface SendFormState {
  chosenContact?: Contact;
  amount: number;
  loading: boolean;
  reason: string;
  category: Category;
}

const initialState: SendFormState = {
  loading: false,
  amount: 0,
  reason: '',
  category: Category.MISC,
};

export const saveTransaction = createAsyncThunk<
  TransactionWithUsers,
  saveTransactionArgs,
  { state: RootState }
>(
  'user/saveTransaction',
  async (
    saveTransactionArgs,
    { getState }
  ): Promise<TransactionWithUsers> => {
    const userID = getState().user.user.id;
    const data = await saveTransactionToDatabase(userID, saveTransactionArgs);
    return data;
  }
);

export const sendFormSlice = createSlice({
  name: 'send',
  initialState,
  reducers: {
    setChosenContact: (state, action: PayloadAction<Contact>) => {
      state.chosenContact = action.payload;
    },
    unsetChosenContact: (state) => {
      delete state.chosenContact;
    },
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    setReason: (state, action: PayloadAction<string>) => {
      state.reason = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveTransaction.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const { setChosenContact, unsetChosenContact, setReason, setAmount } =
  sendFormSlice.actions;

export const selectChosenContact = (state: RootState) =>
  state.sendForm.chosenContact;
export const selectUserLoading = (state: RootState) => state.sendForm.loading;
export const selectAmount = (state: RootState) => state.sendForm.amount;
export const selectReason = (state: RootState) => state.sendForm.reason;

export default sendFormSlice.reducer;
