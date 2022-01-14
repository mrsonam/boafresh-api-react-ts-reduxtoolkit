// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL, warehouseId, apiKey } from '../apiConstants';
import {
    AddAddressBody,
    AddAddressResponse,
    GetAddressResponse,
    GetPaymentMethodResponse,
} from '../types/delivery';
let token = '';
if (localStorage.getItem('token') !== null) {
    token = JSON.parse(localStorage.getItem('token') || '');
}

// Define a service using a base URL and expected endpoints
export const deliveryApi = createApi({
    reducerPath: 'deliveryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers) => {
            headers.set('Warehouse-Id', warehouseId);
            headers.set('Api-key', apiKey);
            headers.set('Authorization', token);
            return headers;
        },
    }),
    tagTypes: ['Address'],
    endpoints: (builder) => ({
        getAddress: builder.query<GetAddressResponse, void>({
            query: () => ({
                url: 'api/v4/delivery-address',
                method: 'GET',
            }),
            providesTags: ['Address']
        }),
        addAddress: builder.mutation<AddAddressResponse, AddAddressBody>({
            query: ({title, latitude, longitude, isDefault}) => ({
                url: 'api/v4/delivery-address',
                method: 'POST',
                body: JSON.stringify({
                    title: title,
                    latitude: latitude,
                    longitude: longitude,
                    isDefault: isDefault,
                }),
            }),
            invalidatesTags: ['Address']
        }),
        getPaymentMethod: builder.query<GetPaymentMethodResponse, void>({
            query: () => ({
                url: 'api/v4/payment-method',
                method: 'GET',
            })
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetAddressQuery,
    useAddAddressMutation,
    useGetPaymentMethodQuery,
} = deliveryApi;
