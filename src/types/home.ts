export interface Detail {
    title: string;
    category_search: string;
    web_link: string;
    link_to: string;
    status: boolean;
    description: string;
    start_date: string;
    end_date: string;
    method_type: string;
    subsection_exist: string;
    images: string;
    category: number;
    id: number;
    position: number;
}

interface Product {
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

interface SectionDetails {
    id: string;
    title: string;
    design_type: string;
    auto_scroll: boolean | null;
    method_type: string;
    collection_type: string | null;
    description: string | null;
    start_date: string | null;
    end_date: string | null;
    category_search: string | null;
    products: Product[] | [];
    brands:
        | {
              id: number;
              title: string;
              icon: string;
              slug: string;
          }[]
        | null;
}

interface Category {
    id: number;
    parentId: number | null;
    title: string;
    description: string | null;
    slug: string;
    icon: string;
    backgroundImage: string;
    position: number;
    hasProduct: boolean;
    avgRating: number;
    ratingCount: number;
    productCount: number;
    userRating: null;
    banner: [];
    hierarchy_level: number;
    isRestaurant: boolean;
    isRestaurantOpen: boolean;
    profile: {
        id: number;
        openingTime: string;
        description: string;
        logo: string;
        address: {
            country: string;
            provience: string;
            district: string;
            local_government: string;
            ward: string;
            street_address: null;
            formatted_address: string;
            intersection: string;
        };
        minimumOrder: number;
        fullAddress: string;
        promo_text: string;
    } | null;
}

export interface Home {
    id: number;
    title: string;
    status: boolean;
    position: number;
    details: Detail[] | [];
    sectionDetails: SectionDetails;
    categories: Category[] | [] ;
}

export interface HomeResponse {
    meta: {
        copyright: string;
        emails: string;
        api: {
            version: string;
        };
        applayout: {
            applayout_id: number;
            applayout_title: string;
        };
    };
    data: Home[];
    code: number;
}
