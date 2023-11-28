import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { saveDepositToDatabase } from '../API/depositAPI';
import { SuccessApiResponse } from '../types/APITypes';
import { Transaction } from '../types/Transaction';
import { CompostStand, DepositForm } from '../types/Deposit';

interface DepositFormState extends Omit<DepositForm, 'compostSmell'> {
  loading: boolean;
  compostSmell?: boolean;
}

const initialState: DepositFormState = {
  amount: 0,
  loading: false,
  notes: '',
  compostStand: CompostStand.null
};

export const sendDepositForm = createAsyncThunk<
  SuccessApiResponse<Transaction>,
  string,
  { state: RootState }
>(
  'depositForm/sendDepositForm',
  async (
    userId: string,
    { getState }
  ): Promise<SuccessApiResponse<Transaction>> => {
    const form = getState().depositForm;
    const response = await saveDepositToDatabase({ ...form, userId });
    if (!('data' in response)) {
      throw new Error(response.message);
    }
    return response;
  }
);

export const depositFormSlice = createSlice({
  name: 'depositForm',
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      if (state.amount === 99) return;
      state.amount += action.payload;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      if (state.amount === 0) return;
      state.amount -= action.payload;
    },
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    setNotes: (state, action: PayloadAction<string>) => {
      state.notes = action.payload;
    },
    setBinStatus: (state, action: PayloadAction<DepositForm['binStatus']>) => {
      state.binStatus = action.payload;
    },
    setCompostSmell: (
      state,
      action: PayloadAction<DepositForm['compostSmell']>
    ) => {
      state.compostSmell = action.payload === 'yes';
    },
    setCompostDryMatter: (
      state,
      action: PayloadAction<DepositForm['dryMatter']>
    ) => {
      state.dryMatter = action.payload;
    },
    setCompostStand: (state, action: PayloadAction<CompostStand>) => {
      state.compostStand = action.payload;
    },
    resetForm: (state) => {
      delete state.dryMatter;
      delete state.compostSmell;
      delete state.binStatus;
      state.amount = 0;
      state.notes = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendDepositForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendDepositForm.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendDepositForm.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  incrementByAmount,
  decrementByAmount,
  resetForm,
  setNotes,
  setCompostDryMatter,
  setBinStatus,
  setCompostSmell,
  setCompostStand,
  setAmount
} = depositFormSlice.actions;

export const selectDepositFormLoading = (state: RootState) =>
  state.depositForm.loading;
export const selectValue = (state: RootState) => state.depositForm.amount;
export const selectNotes = (state: RootState) => state.depositForm.notes;
export const selectCompostStand = (state: RootState) => state.depositForm.compostStand;

export default depositFormSlice.reducer;
