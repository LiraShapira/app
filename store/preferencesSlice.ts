import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export type ColorSchemePreference = 'light' | 'dark' | null; // null = system

interface PreferencesState {
  locale: string | null;
  colorScheme: ColorSchemePreference;
}

const initialState: PreferencesState = {
  locale: null,
  colorScheme: null,
};

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setPreferredLocale: (state, action: PayloadAction<string | null>) => {
      state.locale = action.payload;
    },
    setPreferredColorScheme: (state, action: PayloadAction<ColorSchemePreference>) => {
      state.colorScheme = action.payload;
    },
  },
});

export const { setPreferredLocale, setPreferredColorScheme } = preferencesSlice.actions;

export const selectPreferredLocale = (state: RootState) => state.preferences.locale;
export const selectPreferredColorScheme = (state: RootState) => state.preferences.colorScheme;

export default preferencesSlice.reducer;
