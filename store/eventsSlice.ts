import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { SuccessApiResponse } from '../types/APITypes';
import { LSEvent } from '../types/LSEvents';
import { addAttendee, AddAttendeeArgs, fetchEvents, removeAttendee, RemoveAttendeeArgs } from '../API/eventsAPI';
import { mockEvent1 } from '../Mocks/mockDB';

interface EventsState {
  events: LSEvent[];
  selectedEvent: LSEvent;
  loading: boolean;
}

const initialState: EventsState = {
  events: [],
  selectedEvent: mockEvent1,
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

export const sendNewAttendee = createAsyncThunk<
  SuccessApiResponse<LSEvent[]>,
  AddAttendeeArgs,
  { state: RootState }
>('eventsSlice/addAttendee', async (addAttendeeArgs): Promise<SuccessApiResponse<LSEvent[]>> => {
  const response = await addAttendee(addAttendeeArgs);
  if (!('data' in response)) {
    throw new Error(response.message);
  } else {
    return response;
  }
})

export const deleteAttendee = createAsyncThunk<
  SuccessApiResponse<LSEvent[]>,
  RemoveAttendeeArgs,
  { state: RootState }
>('eventsSlice/deleteAttendee', async (removeAttendeeArgs): Promise<SuccessApiResponse<LSEvent[]>> => {
  const response = await removeAttendee(removeAttendeeArgs);
  if (!('data' in response)) {
    throw new Error(response.message);
  } else {
    return response;
  }
})

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<LSEvent[]>) => {
      state.events = action.payload;
    },
    setSelectedEvent: (state, action: PayloadAction<LSEvent>) => {
      state.selectedEvent = action.payload;
    },
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

export const selectEvents = (state: RootState) => state.eventState.events;
export const selectSelectedEvent = (state: RootState) => state.eventState.selectedEvent;
export const { setSelectedEvent, setEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
