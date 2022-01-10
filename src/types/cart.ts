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

interface CartProductData {
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

interface Extra {
    title: string;
    value: number;
}

interface GetCartData {
    id: 1852;
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
    cartProducts: CartProductData[];
};

interface GetCartSuccessResponse {
    meta: MetaShort;
    data: GetCartData;
    code: number;
}

export type AddToCartResponse = AddToCartSuccessResponse | ErrorResponse;

export type GetCartResponse = GetCartSuccessResponse;
