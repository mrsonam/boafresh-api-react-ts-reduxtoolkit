import { Category } from "./categories";
import { Product } from "./products";

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
