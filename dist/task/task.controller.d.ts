import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { CustomRequest } from 'src/types/express';
export declare class TaskController {
    private taskService;
    constructor(taskService: TaskService);
    create(createTaskDto: CreateTaskDto, req: CustomRequest): Promise<import("./task.entity").Task>;
    findAll(req: CustomRequest): Promise<import("./task.entity").Task[]>;
    findOne(id: string, req: CustomRequest): Promise<import("./task.entity").Task>;
    update(id: string, updateTaskDto: UpdateTaskDto, req: CustomRequest): Promise<import("./task.entity").Task>;
    delete(id: string, req: CustomRequest): Promise<void>;
}
