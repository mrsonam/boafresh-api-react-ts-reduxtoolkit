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

interface CreateUserSuccessResponse {
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

interface UserErrorResponse {
    meta: {
        version: string;
        error_type: string;
    };
    errors: Error[];
}

export interface LoginUserSuccessResponse {
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
    warehouse_id: number;
}

export type CreateUserResponse = CreateUserSuccessResponse | UserErrorResponse;

export type LoginUserResponse = LoginUserSuccessResponse | UserErrorResponse;

export type UserProfileResponse = CreateUserSuccessResponse;

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

export interface UpdateProfileBody {
    firstName: string;
    lastName: string;
}
