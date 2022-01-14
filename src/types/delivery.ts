import { MetaShort } from './constants';

interface GetAddressData {
    id: number;
    title: string;
    latitude: number;
    longitude: number;
    customer: string;
    contactNo: string;
    address: string;
    detail: {
        country: string;
        provience: string;
        district: string;
        local_government: string;
        ward: string;
        street_address: string;
        formatted_address: string;
        intersection: string;
    };
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface GetAddressResponse {
    meta: MetaShort;
    data: GetAddressData[];
    code: number;
}

export interface AddAddressResponse {
    meta: MetaShort;
    data: GetAddressData;
    code: number;
}

export interface AddAddressBody {
    title: string;
    latitude: string;
    longitude: string;
    isDefault: boolean;
}

export interface PaymentMethod {
    id: number;
    title: string;
    default: boolean;
    icon: null;
    live?: boolean;
    merchantCode?: string;
    merchantId?: string;
    merchantSecret?: string;
}

export interface GetPaymentMethodResponse{
    meta: MetaShort;
    data: PaymentMethod[];
    code: number
}
