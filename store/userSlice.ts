import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from '../types/User';
import { fetchUser } from '../API/userAPI';


interface initialState {
  user: User;
  loading: boolean;
}

const initialState: initialState = {
  user: {
    accountBalance: 0,
    dateJoined: new Date().toDateString(),
    userID: '',
    transactions: [],
    userLocalCompostStand: 1,
    userName: '',
  },
  loading: false
};


export const loadUser = createAsyncThunk<
  User,
  string,
  { state: RootState }
>('user/fetchUser',
  async (userPhoneNumber: string) => {
    const { data } = await fetchUser(userPhoneNumber);
    return data;
  });

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
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

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserId = (state: RootState) => state.user.user.userID;
export const selectUserLoading = (state: RootState) => state.user.loading;

export default userSlice.reducer;
