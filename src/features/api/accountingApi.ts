import {createAsyncThunk} from "@reduxjs/toolkit";
import type {UserRegister, UserUpdate} from "../../utils/types";
import {BASE_URL, createToken} from "../../utils/constans.ts";
import type {RootState} from "../../app/store.ts";

export const register = createAsyncThunk(
    'user/register',
    async (user: UserRegister) => {
        const response = await fetch(`${BASE_URL}/account/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        if (response.status === 409) {
            throw new Error(`User with login ${user.login} already exists`)
        }

        if (!response.ok) {
            throw new Error(`Error registering user ${response.statusText}`)
        }

        const data = await response.json();

        return {
            token: createToken(user.login, user.password),
            user: data,
        }
    }
)

export const fetchUser = createAsyncThunk(
    'user/fetch',
    async (token: string) => {
        const response = await fetch(`${BASE_URL}/account/login`, {
            method: 'POST',
            headers: {
                Authorization: token
            }
        })

        if (response.status === 401) {
            throw new Error('Invalid credentials')
        }

        if (!response.ok) {
            throw new Error(`Something went wrong`)
        }

        const user = await response.json()
        return {token, user}
    }
)

export const updateUser = createAsyncThunk<UserUpdate, UserUpdate, {state: RootState}>(
    'user/update',
    async (user: UserUpdate, {getState}) => {
        const login = getState().user.login
        const token = getState().token

        const response = await fetch(`${BASE_URL}/account/user/${login}`, {
            method: 'PATCH',
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        if (response.status === 401) {
            throw new Error('Invalid credentials')
        }

        if (!response.ok) {
            throw new Error(`Something went wrong`)
        }
        const data = await response.json()
        return {
            firstName: data.firstName,
            lastName: data.lastName
        }
    }
)

export const changePassword = createAsyncThunk<string, string, {state: RootState}>(
    'user/password',
    async (newPassword, {getState}) => {
        const login = getState().user.login
        const token = getState().token

        const response = await fetch(`${BASE_URL}/account/password`, {
            method: 'PATCH',
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({password: newPassword})
        })
        if (response.status === 401) {
            throw new Error('Invalid credentials')
        }

        if (!response.ok) {
            throw new Error(`Something went wrong`)
        }
    return createToken(login, newPassword)
    }
)