import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { saveDepositToDatabase } from '../API/depositAPI';
import { SuccessApiResponse } from '../types/APITypes';
import { Transaction } from '../types/Transaction';

interface DepositFormState extends DepositForm {
  loading: boolean;
}

const initialState: DepositFormState = {
  amount: 0,
  loading: false,
  notes: ''
};



export const sendDepositForm = createAsyncThunk<
  SuccessApiResponse<Transaction>,
  string,
  { state: RootState }
>('depositForm/sendDepositForm', async (userId: string, { getState }): Promise<SuccessApiResponse<Transaction>> => {
  const form = getState().depositForm;
  console.log(form)
  const response = await saveDepositToDatabase({ ...form, userId });
  if (!('data' in response)) {
    throw new Error(response.message)
  }
  return response;
});

export const depositFormSlice = createSlice({
  name: 'depositForm',
  initialState,
  reducers: {
    // createSlice will auto-generate the action types and action
    // creators for you, based on the names of the reducer functions you provide.
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.amount += action.payload;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      if (state.amount === 0) return;
      state.amount -= action.payload;
    },
    setNotes: (state, action: PayloadAction<string>) => {
      state.notes = action.payload;
    },
    resetForm: (state) => {
      state.amount = 0;
      state.notes = '';
    }
  },
  extraReducers: builder => {
    builder
      .addCase(sendDepositForm.pending, state => {
        state.loading = true;
      })
      .addCase(sendDepositForm.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const { incrementByAmount, decrementByAmount, resetForm, setNotes } = depositFormSlice.actions;

export const selectDepositFormLoading = (state: RootState) => state.depositForm.loading;
export const selectValue = (state: RootState) => state.depositForm.amount;
export const selectNotes = (state: RootState) => state.depositForm.notes;

export default depositFormSlice.reducer;
