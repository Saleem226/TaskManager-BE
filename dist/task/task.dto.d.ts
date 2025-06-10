import { TaskStatus } from './task.entity';
export declare class CreateTaskDto {
    title: string;
    description: string;
    assignedToId: string;
}
export declare class UpdateTaskDto {
    title?: string;
    description?: string;
    status?: TaskStatus;
    assignedToId?: string;
}
