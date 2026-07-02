import type {UserProfile} from "../../utils/types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchUser, register, updateUser} from "../api/accountingApi.ts";

const initialState = {} as UserProfile

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (_state, action) => action.payload,
        setFirstName: (state, action) => {
            state.firstName = action.payload
        },
        setLastName: (state, action) => {
            state.lastName = action.payload
        },
        setLogin: (state, action) => {
            state.login = action.payload
        },
        clearUser: () => initialState,
    },
    extraReducers: (builder) => {
    builder
        .addCase(register.fulfilled, (_state, action) => action.payload.user)
        .addCase(fetchUser.fulfilled, (_state, action) => action.payload.user)
        .addCase(updateUser.fulfilled, (state, action) => {
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
        })
        },
})

export const {setUser, setFirstName, setLastName, setLogin, clearUser} = userSlice.actions
export default userSlice.reducer