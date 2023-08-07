import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { fetchCount } from './counterAPI';

interface DepositFormState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: DepositFormState = {
  value: 0,
  status: 'idle',
};

export const incrementAsync = createAsyncThunk<
  number,
  number,
  { state: { depositForm: DepositFormState } }
>('counter/fetchCount', async (amount: number, { getState }) => {
  const { value } = getState().depositForm;
  const response = await fetchCount(value, amount);
  return response.data;
});

export const depositFormSlice = createSlice({
  name: 'depositForm',
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      if (state.value === 0) return;
      state.value -= action.payload;
    },
    reset: (state) => {
      state
    }
  },
  extraReducers: builder => {
    builder
      .addCase(incrementAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      });
  },
});

export const { incrementByAmount, decrementByAmount } = depositFormSlice.actions;

export const selectCount = (state: RootState) => state.depositForm.value;

export default depositFormSlice.reducer;
