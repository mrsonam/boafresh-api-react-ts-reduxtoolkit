import { ErrorResponse, MetaLong } from "./constants";

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

interface CreateUserSuccessResponse {
    meta: MetaLong;
    data: User;
    code: number;
}

export interface LoginUserSuccessResponse {
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
    warehouse_id: number;
}

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

export interface ChangePasswordBody {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export type CreateUserResponse = CreateUserSuccessResponse | ErrorResponse;

export type LoginUserResponse = LoginUserSuccessResponse | ErrorResponse;

export type UserProfileResponse = CreateUserSuccessResponse;

export type ForgotPasswordResponse = CreateUserResponse | ErrorResponse;

export type ChangePasswordResponse = CreateUserResponse | ErrorResponse;