import { User } from '../users/user.entity';
export declare enum TaskStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}
export type TaskStatusType = keyof typeof TaskStatus;
export declare class Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatusType;
    assignedTo: User;
    createdAt: Date;
    updatedAt: Date;
}
