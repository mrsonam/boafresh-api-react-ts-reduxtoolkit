// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL, warehouseId, apiKey } from '../apiConstants';
import { HomeResponse } from '../types/home';

// Define a service using a base URL and expected endpoints
export const homeApi = createApi({
    reducerPath: 'homeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers) => {
            headers.set('Warehouse-Id', warehouseId);
            headers.set('Api-key', apiKey);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getHome: builder.query<HomeResponse, void>({
            query: () => ({
                url: 'api/v4/newhome',
                method: 'GET',
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetHomeQuery } = homeApi;
