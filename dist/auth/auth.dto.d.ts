import { UserRole } from 'src/users/user.entity';
export declare class RegisterDto {
    email: string;
    password: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export interface AuthResponse {
    accessToken: string;
    user: {
        id: string;
        email: string;
        role: UserRole;
    };
}
export interface UserPayload {
    userId: string;
    email: string;
    role: UserRole;
}
export interface JwtPayload {
    email: string;
    sub: string;
    role: UserRole;
    iat?: number;
    exp?: number;
}
