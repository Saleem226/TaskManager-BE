import { Repository } from 'typeorm';
import { User } from './user.entity';
import { TaskGateway } from '../websocket/websocket.gateway';
import { EventsService } from 'src/events/events.service';
import { UserPayload } from 'src/auth/auth.dto';
export declare class UsersService {
    private userRepository;
    private taskGateway;
    private eventLogService;
    constructor(userRepository: Repository<User>, taskGateway: TaskGateway, eventLogService: EventsService);
    findAll(user: UserPayload): Promise<User[]>;
    updatePassword(password: string, user: UserPayload): Promise<void>;
}
