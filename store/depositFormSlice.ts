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
  dryMatter: 'yes',
  loading: false,
  formTouched: false,
  notes: '',
  compostStand: CompostStand.blank
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

    resetOptionalProperties: (state) => {
      delete state.dryMatter;
      delete state.compostSmell;
      state.notes = '';
      state.formTouched = false;
    },
    setCompostStand: (state, action: PayloadAction<CompostStand>) => {
      state.compostStand = action.payload;
    },
    resetForm: (state) => {
      delete state.dryMatter;
      delete state.compostSmell;
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
  resetOptionalProperties,
  setCompostStand,
  setAmount,
  toggleCompostSmell,
  toggleMissingDryMatter,
  toggleScalesMissing,
  toggleCompostFull,
  toggleBugs,
  toggleCleanAndTidy
} = depositFormSlice.actions;

export const selectDepositForm = (state: RootState) =>
  state.depositForm;
export const selectDepositFormLoading = (state: RootState) =>
  state.depositForm.loading;
export const selectValue = (state: RootState) => state.depositForm.amount;
export const selectNotes = (state: RootState) => state.depositForm.notes;
export const selectFormTouched = (state: RootState) => state.depositForm.formTouched;
export const selectCompostStand = (state: RootState) => state.depositForm.compostStand;

export default depositFormSlice.reducer;
