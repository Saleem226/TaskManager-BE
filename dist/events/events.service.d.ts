import { Model } from 'mongoose';
import { EventLog, EventLogDocument } from './schemas/event-log.schema';
import { UserPayload } from '../auth/auth.dto';
export declare class EventsService {
    private eventModel;
    constructor(eventModel: Model<EventLogDocument>);
    logEvent(taskId: string, action: 'create' | 'update' | 'delete', user: UserPayload, details: Record<string, any>): Promise<void>;
    getEvents(taskId: string | undefined): Promise<EventLog[]>;
}
