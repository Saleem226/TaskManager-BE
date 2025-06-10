import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(registerDto: RegisterDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            role: import("../users/user.entity").UserRole;
        };
    }>;
    login(loginDto: LoginDto): Promise<import("./auth.dto").AuthResponse>;
}
