import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export type ThemePreference = 'light' | 'dark';

interface AppState {
  isModalVisible: boolean;
  loading: boolean;
  modalText: string;
  theme: ThemePreference;
  locale: string;
}

const initialState: AppState = {
  loading: false,
  isModalVisible: false,
  modalText: '',
  theme: 'light',
  locale: 'en',
};

export const appStateSlice = createSlice({
  name: 'AppState',
  initialState,
  reducers: {
    setIsModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isModalVisible = action.payload;
    },
    setModalText: (state, action: PayloadAction<string>) => {
      state.modalText = action.payload;
    },
    setAppLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTheme: (state, action: PayloadAction<ThemePreference>) => {
      state.theme = action.payload;
    },
    setLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
    },
  },
});

export const { setIsModalVisible, setModalText, setAppLoading, setTheme, setLocale } =
  appStateSlice.actions;

export const selectIsAppLoading = (state: RootState) => state.appState.loading;
export const selectModalText = (state: RootState) => state.appState.modalText;
export const selectIsModalVisible = (state: RootState) => state.appState.isModalVisible;
export const selectTheme = (state: RootState) => state.appState.theme;
export const selectLocale = (state: RootState) => state.appState.locale;

export default appStateSlice.reducer;
