import { MetaLong, MetaShort } from "./constants";

export interface Product {
    id: number;
    title: string;
    slug: string;
    link: string;
    moreInfo: string;
    description: string;
    taxable: boolean;
    taxableAmount: number;
    decimal: boolean;
    hasOffer: null;
    categoryId: number;
    categoryTitle: string;
    categorySlug: string;
    categoryIcon: string;
    categoryBackgroundImage: string;
    unitPrice: [
        {
            id: number;
            title: string;
            sellingPrice: number;
            markedPrice: number;
            newPrice: number;
            oldPrice: number;
            size: null;
            sku: string;
            description: null;
            barcode: null;
            stock: number;
            hasOffer: boolean;
            alwaysAvailable: boolean;
        },
    ];
    images: [
        {
            id: number;
            imageName: string;
            unit_price_id: null;
        },
    ];
    warehouses: [
        {
            id: number;
            title: string;
        },
    ];
    tags: [];
    brand: null;
}

export interface ProductsResponse {
    meta: MetaLong;
    data: Product[];
    code: number;
}

export interface ProductResponse {
    meta: MetaShort;
    data: Product;
    code: number;
}