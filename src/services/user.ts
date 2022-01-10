// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    baseURL,
    warehouseId,
    apiKey,
    clientId,
    clientSecret,
    grantType,
} from '../apiConstants';
import {
    CreateUserBody,
    LoginUserBody,
    CreateUserResponse,
    LoginUserSuccessResponse,
    UserProfileResponse,
    UpdateProfileBody,
    ForgotPasswordResponse,
    ChangePasswordResponse,
    ChangePasswordBody,
} from '../types/user';
let token = '';
if (localStorage.getItem('token') !== null) {
    token = JSON.parse(localStorage.getItem('token') || '');
}
// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers) => {
            headers.set('Api-key', apiKey);
            // headers.set('Authorization', localStorage.getItem('token') || ' ');
            if (token !== null) {
                headers.set('Authorization', token);
            } else {
                headers.set('Warehouse-Id', warehouseId);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createNewUser: builder.mutation<CreateUserResponse, CreateUserBody>({
            query: ({ firstName, lastName, email, phone, password }) => ({
                url: 'api/v4/auth/signup',
                method: 'POST',
                body: {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    mobile_number: phone,
                    password: password,
                },
            }),
        }),
        loginUser: builder.mutation<LoginUserSuccessResponse, LoginUserBody>({
            query: ({ email, password }) => ({
                url: `api/v4/auth/login`,
                method: 'POST',
                body: {
                    client_id: clientId,
                    client_secret: clientSecret,
                    grant_type: grantType,
                    username: email,
                    password: password,
                },
            }),
        }),
        forgotPassword: builder.mutation<ForgotPasswordResponse, string>({
            query: (email) => ({
                url: `api/v4/auth/forgot-password`,
                method: 'POST',
                body: {
                    email: email,
                },
            }),
        }),
        getUserProfile: builder.query<UserProfileResponse, void>({
            query: () => ({
                url: `api/v4/profile/show`,
                method: 'GET',
            }),
        }),
        updateUserProfile: builder.mutation<
            UserProfileResponse,
            UpdateProfileBody
        >({
            query: ({ firstName, lastName }) => ({
                url: 'api/v4/profile',
                method: 'PATCH',
                body: JSON.stringify({
                    'first-name': firstName,
                    'last-name': lastName,
                }),
            }),
        }),
        changePassword: builder.mutation<
            ChangePasswordResponse,
            ChangePasswordBody
        >({
            query: ({ oldPassword, newPassword, confirmPassword }) => ({
                url: 'api/v4/profile/change-password',
                method: 'POST',
                body: JSON.stringify({
                    'old-password': oldPassword,
                    'new-password': newPassword,
                    'confirm-password': confirmPassword,
                }),
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useCreateNewUserMutation,
    useLoginUserMutation,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useForgotPasswordMutation,
    useChangePasswordMutation,
} = userApi;
