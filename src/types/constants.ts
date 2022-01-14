export interface MetaLong {
    copyright: string;
    emails: string;
    api: {
        version: string;
    };
    category: null;
    tag: null;
    pagination: {
        total: number;
        count: number;
        per_page: number;
        current_page: number;
        total_pages: number;
        links: [];
    };
}

export interface MetaShort {
    copyright: string;
    emails: string;
    api: {
        version: string;
    };
}

interface Error {
    title: string;
    message: string;
}

export interface ErrorResponse {
    data: {
        meta: {
            version: string;
            error_type: string;
        };
        errors: Error[];
        code: number;
    };
}
