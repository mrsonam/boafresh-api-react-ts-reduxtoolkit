// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL, warehouseId, apiKey } from '../apiConstants';
import { CategoryResponse } from '../types/categories';

// Define a service using a base URL and expected endpoints
export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers) => {
            headers.set('Warehouse-Id', warehouseId);
            headers.set('Api-key', apiKey);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAllCategories: builder.query<CategoryResponse, void>({
            query: () => ({
                url: 'api/v4/category',
                method: 'GET',
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllCategoriesQuery } = categoryApi;
