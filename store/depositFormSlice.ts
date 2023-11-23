import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { FormWithUserId, saveDepositToDatabase } from '../API/depositAPI';
import { ApiResponse, SuccessApiResponse } from '../types/APITypes';
import { Transaction } from '../types/Transaction';
import { CompostStand, DepositForm } from '../types/Deposit';

interface DepositFormState extends DepositForm {
  loading: boolean;
  formTouched: boolean;
}

const initialState: DepositFormState = {
  amount: 0,
  loading: false,
  formTouched: false,
  notes: '',
  compostStand: CompostStand.hakaveret
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
    let response: ApiResponse<Transaction>;
    let requestBody: FormWithUserId;
    const form = getState().depositForm;

    if (form.formTouched) {
      requestBody = ({ 
        ...form,
        userId: userId,
        compostSmell: form.compostSmell === 'yes'
       })
    } else {
      requestBody = ({ 
        amount: form.amount, 
        userId: userId,
        compostStand: form.compostStand
      })
    }

    response = await saveDepositToDatabase(requestBody);

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
      state.formTouched = true;
      state.notes = action.payload;
    },
    setBinStatus: (state, action: PayloadAction<DepositForm['binStatus']>) => {
      state.formTouched = true;
      state.binStatus = action.payload;
    },
    setCompostSmell: (
      state,
      action: PayloadAction<DepositForm['compostSmell']>
    ) => {
      state.formTouched = true;
      state.compostSmell = action.payload;
    },
    setCompostDryMatter: (
      state,
      action: PayloadAction<DepositForm['dryMatter']>
    ) => {
      state.formTouched = true;
      state.dryMatter = action.payload;
    },
    resetOptionalProperties: (state) => {
      delete state.dryMatter;
      delete state.compostSmell;
      delete state.binStatus;
      state.notes = '';
      state.formTouched = false;
    },
    setCompostStand: (state, action: PayloadAction<CompostStand>) => {
      state.compostStand = action.payload;
    },
    resetForm: (state) => {
      delete state.dryMatter;
      delete state.compostSmell;
      delete state.binStatus;
      state.notes = '';
      state.formTouched = false;
      state.amount = 0;
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
  resetOptionalProperties,
  setCompostStand,
  setAmount
} = depositFormSlice.actions;

export const selectDepositFormLoading = (state: RootState) =>
  state.depositForm.loading;
export const selectValue = (state: RootState) => state.depositForm.amount;
export const selectNotes = (state: RootState) => state.depositForm.notes;
export const selectFormTouched = (state: RootState) => state.depositForm.formTouched;
export const selectCompostStand = (state: RootState) => state.depositForm.compostStand;

export default depositFormSlice.reducer;
