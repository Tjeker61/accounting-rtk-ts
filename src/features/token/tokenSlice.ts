import {createSlice} from "@reduxjs/toolkit";
import {changePassword, fetchUser, register} from "../api/accountingApi.ts";

const initialState = ''

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (_state, action) => action.payload,
        clearToken: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (_state, action) => action.payload.token)
            .addCase(fetchUser.fulfilled, (_state, action) => action.payload.token)
            .addCase(changePassword.fulfilled, (_state, action) => action.payload)
    },
})

export const {setToken, clearToken} = tokenSlice.actions
export default tokenSlice.reducer