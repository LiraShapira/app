import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { sendForm } from '../API/depositAPI';

interface DepositFormState extends DepositForm {
  loading: boolean;
}

const initialState: DepositFormState = {
  value: 0,
  userId: '',
  loading: false,
  notes: ''
};



export const sendDepositForm = createAsyncThunk<
  string | false,
  string,
  { state: RootState }
>('depositForm/sendDepositForm', async (userId: string, { getState }) => {
  const form = getState().depositForm;
  form.userId = userId;
  try {
    const response = await sendForm(form);
    return response;
  } catch (e) {
    console.log(e);
    return false;
  }
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
      state.notes = action.payload;
    },
    resetForm: (state) => {
      state.value = 0;
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
export const selectValue = (state: RootState) => state.depositForm.value;
export const selectNotes = (state: RootState) => state.depositForm.notes;

export default depositFormSlice.reducer;
