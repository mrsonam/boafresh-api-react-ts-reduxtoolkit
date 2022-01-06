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
import { UserResponse, CreateUserBody, LoginUserBody } from '../types/user';

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers) => {
            headers.set('Warehouse-Id', warehouseId);
            headers.set('Api-key', apiKey);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createNewUser: builder.mutation<UserResponse, CreateUserBody>({
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
        loginUser: builder.mutation<UserResponse, LoginUserBody>({
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
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateNewUserMutation, useLoginUserMutation } = userApi;
