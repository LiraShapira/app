import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

interface SendFormState {
  isModalVisible: boolean;
  loading: boolean;
  modalText: string;
}

const initialState: SendFormState = {
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
    }
  },
});

export const { setIsModalVisible, setModalText } =
  appStateSlice.actions;

export const selectModalText = (state: RootState) => state.appState.modalText;
export const selectIsModalVisible = (state: RootState) => state.appState.isModalVisible;

export default appStateSlice.reducer;
