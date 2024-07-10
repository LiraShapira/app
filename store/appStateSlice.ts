import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

interface AppState {
  isModalVisible: boolean;
  loading: boolean;
  modalText: string;
}

const initialState: AppState = {
  loading: false,
  isModalVisible: false,
  modalText: ''
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
    }
  },
});

export const { setIsModalVisible, setModalText, setAppLoading } =
  appStateSlice.actions;

export const selectIsAppLoading = (state: RootState) => state.appState.loading;
export const selectModalText = (state: RootState) => state.appState.modalText;
export const selectIsModalVisible = (state: RootState) => state.appState.isModalVisible;

export default appStateSlice.reducer;
