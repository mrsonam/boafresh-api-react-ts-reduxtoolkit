//Categories
export interface SubCategories {
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
    subcategories: [];
}

export interface Category {
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
    subcategories: SubCategories[];
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

export interface CategoryResponse {
    meta: {
        copyright: string;
        emails: string;
        api: {
            version: string;
        };
        banners: [];
        pagination: {
            total: number;
            count: number;
            per_page: number;
            current_page: number;
            total_pages: number;
            links: [];
        };
    };
    data: Category[];
    code: number;
}

//Home
