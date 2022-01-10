// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL, warehouseId, apiKey } from '../apiConstants';
import { ProductsResponse, ProductResponse } from '../types/products';

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers) => {
            headers.set('Warehouse-Id', warehouseId);
            headers.set('Api-key', apiKey);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAllProducts: builder.query<ProductsResponse, void>({
            query: () => ({
                url: 'api/v4/product',
                method: 'GET',
            }),
        }),
        getSingleProduct: builder.query<ProductResponse, number>({
            query: (productId) => ({
                url: `api/v4/product/${productId}`,
                method: 'GET'
            })
        }),
        getProductsByCategory: builder.query<ProductsResponse, string>({
            query: (categoryId: string) => ({
                url: `api/v4/product?categoryId=${categoryId}`,
                method: 'GET',
            }),
        }),
        getSearchedProducts: builder.query<ProductsResponse, string>({
            query: (searchQuery: string) => ({
                url: `api/v4/product?query=${searchQuery}`,
                method: 'GET',
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetAllProductsQuery,
    useGetSingleProductQuery,
    useGetProductsByCategoryQuery,
    useGetSearchedProductsQuery,
} = productsApi;
