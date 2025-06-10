import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User, UserRole } from '../users/user.entity';
import { AuthResponse, LoginDto } from './auth.dto';
export declare class AuthService {
    private userRepo;
    private jwtService;
    constructor(userRepo: Repository<User>, jwtService: JwtService);
    signup(payload: {
        email: string;
        password: string;
    }): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            role: UserRole;
        };
    }>;
    login(loginDto: LoginDto): Promise<AuthResponse>;
    private generateToken;
}
