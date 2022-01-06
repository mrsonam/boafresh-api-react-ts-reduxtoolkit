export interface User {
    id: number;
    email: string;
    username: null;
    firstName: string;
    lastName: string;
    verified: boolean;
    mobileNumber: string;
    createdAt: string;
    updatedAt: string;
    image: string;
    total_loyalty_points: null;
}

interface Error {
    title: string;
    message: string;
}

export interface UserSuccessResponse {
    meta: {
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
    };
    data: User;
    code: number;
}

export interface UserErrorResponse {
    meta: {
        version: string;
        error_type: string;
    };
    errors: Error[];
}

export type UserResponse = UserSuccessResponse | UserErrorResponse;

export interface CreateUserBody {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
}

export interface LoginUserBody {
    email: string;
    password: string;
}
