import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { FormWithUserId, saveDepositToDatabase } from '../API/depositAPI';
import { ApiResponse, SuccessApiResponse } from '../types/APITypes';
import { Transaction } from '../types/Transaction';
import { CompostStand, DepositForm } from '../types/Deposit';

interface DepositFormState extends DepositForm {
  loading: boolean;
  guaranteedAccurate: boolean;
}

const initialState: DepositFormState = {
  amount: '',
  dryMatter: 'yes',
  loading: false,
  notes: '',
  compostStand: CompostStand.hakaveret,
  guaranteedAccurate: false
};

export const sendSkippedDepositForm = createAsyncThunk<
  SuccessApiResponse<Transaction[]>,
  string,
  { state: RootState }
>(
  'depositForm/sendSkippedDepositForm',
  async (
    userId: string,
    { getState }
  ): Promise<SuccessApiResponse<Transaction[]>> => {
    let response: ApiResponse<Transaction[]>;
    const form = getState().depositForm;
    const { amount, compostStand } = form;
    const requestBody: {
      userId: string;
      amount: string;
      compostStand: CompostStand;
    } = {
      userId,
      amount,
      compostStand
    };

    response = await saveDepositToDatabase(requestBody);

    if (!('data' in response)) {
      throw new Error(response.message);
    }

    return response;
  }
);

export const sendDepositForm = createAsyncThunk<
  SuccessApiResponse<Transaction[]>,
  string,
  { state: RootState }
>(
  'depositForm/sendDepositForm',
  async (
    userId: string,
    { getState }
  ): Promise<SuccessApiResponse<Transaction[]>> => {
    let response: ApiResponse<Transaction[]>;
    let requestBody: FormWithUserId;
    const form = getState().depositForm;

    requestBody = ({
      ...form,
      userId: userId,
    })

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
    setAmount: (state, action: PayloadAction<string>) => {
      state.amount = action.payload;
    },
    setNotes: (state, action: PayloadAction<string>) => {
      state.notes = action.payload;
    },
    toggleCompostSmell: (
      state
    ) => {
      state.compostSmell = !state.compostSmell;
    },
    toggleMissingDryMatter: (state) => {
      state.dryMatter = (state.dryMatter === 'no') ? 'yes' : 'no';
    },
    toggleBugs: (state) => {
      state.bugs = !state.bugs;
    },
    toggleScalesMissing: (state) => {
      state.scalesMissing = !state.scalesMissing;
    },
    toggleCompostFull: (state) => {
      state.compostFull = !state.compostFull;
    },
    toggleCleanAndTidy: (state) => {
      state.cleanAndTidy = !state.cleanAndTidy;
    },
    setCompostStand: (state, action: PayloadAction<CompostStand>) => {
      state.compostStand = action.payload;
    },
    resetForm: (state) => {
      delete state.dryMatter;
      state.compostSmell = false;
      state.notes = '';
      state.bugs = false;
      state.cleanAndTidy = false;
      state.scalesMissing = false;
      state.compostFull = false;
      state.amount = '';
    },
    setGuaranteedAccurate: (state, action: PayloadAction<boolean>) => {
      state.guaranteedAccurate = action.payload;
    }
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
  resetForm,
  setNotes,
  setCompostStand,
  setAmount,
  toggleCompostSmell,
  toggleMissingDryMatter,
  toggleScalesMissing,
  toggleCompostFull,
  toggleBugs,
  toggleCleanAndTidy,
  setGuaranteedAccurate
} = depositFormSlice.actions;

export const selectDepositForm = (state: RootState) =>
  state.depositForm;
export const selectDepositFormLoading = (state: RootState) =>
  state.depositForm.loading;
export const selectDepositValue = (state: RootState) => state.depositForm.amount;
export const selectNotes = (state: RootState) => state.depositForm.notes;
export const selectCompostStand = (state: RootState) => state.depositForm.compostStand;
export const selectIsGuaranteedAccurate = (state: RootState) => state.depositForm.guaranteedAccurate;

export default depositFormSlice.reducer;
