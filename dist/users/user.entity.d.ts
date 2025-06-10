import { Task } from '../task/task.entity';
export declare enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
}
export type UserRoleType = keyof typeof UserRole;
export declare class User {
    id: string;
    email: string;
    password: string;
    role: UserRoleType;
    tasks: Task[];
}
