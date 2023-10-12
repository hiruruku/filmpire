import { createSlice } from '@reduxjs/toolkit';

type User = {
  id?: number;
  username?: string;
}

type authSliceType = {
  user: User;
  isAuthenticated: boolean;
  sessionId: string | null;
};

const authSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    isAuthenticated: false,
    sessionId: '',
  } as authSliceType,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.sessionId = localStorage.getItem('session_id');

      localStorage.setItem('accountId', action.payload.id);
    },
  },
});
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
export const userSelector = (state: authSliceType) => {
  return { isAuthenticated: state.isAuthenticated, user: state.user };
};
