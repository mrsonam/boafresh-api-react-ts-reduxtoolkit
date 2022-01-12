// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL, warehouseId, apiKey } from '../apiConstants';
import { AddToCartResponse, CartBody, GetCartResponse, UpdateCartBody } from '../types/cart';
let token = '';
if (localStorage.getItem('token') !== null) {
    token = JSON.parse(localStorage.getItem('token') || '');
}

// Define a service using a base URL and expected endpoints
export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers) => {
            headers.set('Warehouse-Id', warehouseId);
            headers.set('Api-key', apiKey);
            headers.set('Authorization', token);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        addToCart: builder.mutation<AddToCartResponse, CartBody>({
            query: ({ productId, priceId, quantity, note }) => ({
                url: 'api/v4/cart-product',
                method: 'POST',
                body: {
                    productId: productId,
                    priceId: priceId,
                    quantity: quantity,
                    note: note,
                },
            }),
        }),
        updateCart: builder.mutation<AddToCartResponse, UpdateCartBody>({
            query: ({ cartId, quantity }) => ({
                url: `api/v4/cart-product/${cartId}`,
                method: 'PATCH',
                body: {
                    quantity: quantity,
                },
            }),
        }),
        deleteCartItem: builder.mutation<AddToCartResponse, number>({
            query: (cartId) => ({
                url: `api/v4/cart-product/${cartId}`,
                method: 'DELETE',
            }),
        }),
        deleteCart: builder.mutation<void, void>({
            query: () => ({
                url: `api/v4/cart`,
                method: 'DELETE',
            }),
        }),
        getCart: builder.query<GetCartResponse, void>({
            query: () => ({
                url: 'api/v4/cart',
                method: 'GET',
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddToCartMutation, useGetCartQuery, useUpdateCartMutation, useDeleteCartItemMutation, useDeleteCartMutation } = cartApi;
