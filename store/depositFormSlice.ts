import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { sendForm } from './depositAPI';

interface DepositFormState extends DepositForm {
  loading: boolean;
}

const initialState: DepositFormState = {
  value: 0,
  userId: '',
  loading: false,
  notes: ''
};

export const resetFormAsync = createAsyncThunk<
  string,
  string,
  { state: { depositForm: DepositFormState } }
>('depositForm/resetFormAsync', async (userId: string, { getState }) => {
  console.log('resetting')
  const form = getState().depositForm;
  form.userId = userId;
  const response = await sendForm(form);
  return response;
});

export const depositFormSlice = createSlice({
  name: 'depositForm',
  initialState,
  reducers: {
    // createSlice will auto-generate the action types and action
    // creators for you, based on the names of the reducer functions you provide.
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      if (state.value === 0) return;
      state.value -= action.payload;
    },
    setNotes: (state, action: PayloadAction<string>) => {
      console.log(action.payload)
      state.notes = action.payload;
    },
    resetForm: (state) => {
      state.value = 0;
      state.notes = '';
    }
  },
  extraReducers: builder => {
    builder
      .addCase(resetFormAsync.pending, state => {
        state.loading = true;
      })
      .addCase(resetFormAsync.fulfilled, (state) => {
        state.loading = false;
        state.value = 0;
        state.notes = '';
      });
  },
});

export const { incrementByAmount, decrementByAmount, resetForm, setNotes } = depositFormSlice.actions;

export const selectDepositFormLoading = (state: RootState) => state.depositForm.loading;
export const selectValue = (state: RootState) => state.depositForm.value;
export const selectNotes = (state: RootState) => state.depositForm.notes;

export default depositFormSlice.reducer;
