import { ErrorResponse, MetaShort } from './constants';
import { Product } from './products';

interface SelectedUnit {
    id: number;
    title: string;
    sellingPrice: number;
    markedPrice: number;
    newPrice: number;
    oldPrice: number;
    size: string;
    sku: string;
    barcode: string;
    stock: number;
    hasOffer: boolean;
    alwaysAvailable: boolean;
}

export interface CartProductData {
    id: number;
    price: number;
    quantity: number;
    selectedUnit: SelectedUnit;
    note: string;
    product: Product;
}

interface AddToCartSuccessResponse {
    meta: MetaShort;
    data: CartProductData;
    code: number;
}

export interface CartBody {
    productId: number;
    priceId: number;
    quantity: number;
    note: string;
}

export interface UpdateCartBody {
    cartId: number;
    quantity: number;
}

interface Extra {
    title: string;
    value: number;
}

export interface GetCartData {
    id: number;
    cartNumber: string;
    categoryId: null;
    warehouseId: number;
    orderAmount: number;
    discount: number;
    scheme: number;
    subTotal: number;
    deliveryCharge: number;
    extra: Extra[];
    message: string;
    campaign_message: string;
    total: number;
    pickupTotal: number;
    cartProducts: CartProductData[] | [];
}

interface GetCartSuccessResponse {
    meta: MetaShort;
    data: GetCartData;
    code: number;
}

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

export type AddToCartResponse = AddToCartSuccessResponse | ErrorResponse;

export type GetCartResponse = GetCartSuccessResponse;
