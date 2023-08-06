import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../store/counterSlice';
import userSliceReducer from './userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userSliceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
