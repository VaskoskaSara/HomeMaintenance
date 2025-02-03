import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    role?: number;
    id?: string;
    avatar?: string;
}

const initialState: AuthState = {
    isAuthenticated: false,
    role: undefined,
    id: undefined,
    avatar: undefined,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ id: string; role: number; avatar: string }>) => {
            state.isAuthenticated = true;
            state.id = action.payload.id;
            state.role = action.payload.role;
            state.avatar =  action.payload.avatar;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.id = undefined;
            state.role = undefined;
            state.avatar = undefined;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
