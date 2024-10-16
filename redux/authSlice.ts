// store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isLoggedIn: boolean;
    phone: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    phone: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<string>) {
            state.isLoggedIn = true;
            state.phone = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.phone = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;