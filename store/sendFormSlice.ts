import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { Contact } from 'expo-contacts';


interface initialState {
  chosenContact?: Contact;
  loading: boolean;
}

const initialState: initialState = {
  loading: false
};

export const sendFormSlice = createSlice({
  name: 'send',
  initialState,
  reducers: {
    setChosenContact: (state, action: PayloadAction<Contact>) => {
      console.log(action.payload)
      state.chosenContact = action.payload;
    },
    unsetChosenContact: (state) => {
      delete state.chosenContact;
    }
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(loadUser.pending, state => {
  //       state.loading = true;
  //     })
  //     .addCase(loadUser.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.user = action.payload;
  //     });
  // },
});

export const { setChosenContact, unsetChosenContact } = sendFormSlice.actions;

export const selectChosenContact = (state: RootState) => state.sendForm.chosenContact;
export const selectUserLoading = (state: RootState) => state.sendForm.loading;

export default sendFormSlice.reducer;
