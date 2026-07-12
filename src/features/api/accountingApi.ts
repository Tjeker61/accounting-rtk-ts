import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../../utils/constans.ts";
import type {UserProfile, UserRegister, UserUpdate} from "../../utils/types";
import type {RootState} from "../../app/store.ts";

export const accountingApi = createApi({
    reducerPath: 'accountingApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, {getState, endpoint}) => {
            if (endpoint === 'updateUser') {
                const token = (getState() as RootState).token
                if (token) {
                    headers.set('Authorization', token)
                }
            }
            return headers
        }
    }),
    tagTypes: ['User'],
    endpoints: builder => ({
        registerUser: builder.mutation<UserProfile, UserRegister>({
            query: user => ({
                url: 'account/register',
                method: 'POST',
                body: user
            })
        }),
        fetchUser: builder.query<UserProfile, string>({
            query: token => ({
                url: '/account/login',
                method: 'POST',
                headers: {
                    Authorization: token
                },
            }),
            providesTags: ['User']
        }),
        updateUser: builder.mutation<UserProfile, { user: UserUpdate, login: string}>({
            query: ({user, login}) => ({
                url: `/account/user/${login}`,
                method: 'PATCH',
                body: user,
            }),
            invalidatesTags: ['User']
        }),
        changePassword: builder.mutation<void, { newPassword: string, token: string }>({
            query: ({newPassword, token}) => ({
                url: '/account/password',
                method: 'PATCH',
                body: {password: newPassword},
                headers: {
                    Authorization: token
                }
            })
        })
    }),
})

export const {useRegisterUserMutation, useLazyFetchUserQuery, useFetchUserQuery, useChangePasswordMutation, useUpdateUserMutation} = accountingApi