import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,     // { uid, displayName, email, photoURL }
    loading: true,  // Firebase 인증 초기화 전까지 true
    error: null,
  },
  reducers: {
    // 로그인 성공 후 유저 정보 저장
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },

    // 로그아웃 시 유저 정보 초기화
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },

    // Firebase onAuthStateChanged 초기화 로딩 제어
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // 인증 에러 저장
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setUser, clearUser, setLoading, setError } = authSlice.actions;

// 셀렉터: 현재 로그인된 유저 정보
export const selectUser = (state) => state.auth.user;

// 셀렉터: 로그인 여부 (boolean)
export const selectIsLoggedIn = (state) => state.auth.user !== null;

// 셀렉터: 인증 초기화 로딩 상태
export const selectAuthLoading = (state) => state.auth.loading;

// 셀렉터: 인증 에러
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
