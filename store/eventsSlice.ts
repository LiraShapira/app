import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { SuccessApiResponse } from '../types/APITypes';
import { LSEvent } from '../types/LSEvents';
import { fetchEvents } from '../API/eventsAPI';

interface EventsState {
  events: LSEvent[];
  selectedEvent: LSEvent | null;
  loading: boolean;
}

const initialState: EventsState = {
  events: [],
  selectedEvent: null,
  loading: false
};

export const loadEvents = createAsyncThunk<
  SuccessApiResponse<LSEvent[]>,
  undefined,
  { state: RootState }>
  ('eventsSlice/loadEvents', async (): Promise<SuccessApiResponse<LSEvent[]>> => {
    const response = await fetchEvents();
    if (!('data' in response)) {
      throw new Error(response.message);
    } else {
      return response;
    }
  });

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(loadEvents.pending, state => {
        state.loading = true;
      })
      .addCase(loadEvents.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loadEvents.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default eventsSlice.reducer;
