import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { UserPayload } from 'src/auth/auth.dto';
import { TaskGateway } from '../websocket/websocket.gateway';
import { EventsService } from 'src/events/events.service';
export declare class TaskService {
    private taskRepository;
    private taskGateway;
    private eventLogService;
    constructor(taskRepository: Repository<Task>, taskGateway: TaskGateway, eventLogService: EventsService);
    create(createTaskDto: CreateTaskDto, user: UserPayload): Promise<Task>;
    findAll(user: UserPayload): Promise<Task[]>;
    findOne(id: string, user: UserPayload): Promise<Task>;
    update(id: string, updateTaskDto: UpdateTaskDto, user: UserPayload): Promise<Task>;
    delete(id: string, user: UserPayload): Promise<void>;
}
