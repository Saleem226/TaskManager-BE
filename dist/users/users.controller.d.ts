import { UsersService } from './users.service';
import { CustomRequest } from 'src/types/express';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    findAll(req: CustomRequest): Promise<import("./user.entity").User[]>;
    updatePassword(password: string, req: CustomRequest): Promise<{
        message: string;
    }>;
}
