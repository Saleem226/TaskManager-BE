import { Document } from 'mongoose';
import { UserRole } from 'src/users/user.entity';
export type EventLogDocument = EventLog & Document;
export declare class EventLog {
    userId: string;
    taskId: string;
    action: string;
    timestamp: Date;
    userEmail: string;
    userRole: UserRole;
    details: Record<string, any>;
}
export declare const EventLogSchema: import("mongoose").Schema<EventLog, import("mongoose").Model<EventLog, any, any, any, Document<unknown, any, EventLog, any> & EventLog & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EventLog, Document<unknown, {}, import("mongoose").FlatRecord<EventLog>, {}> & import("mongoose").FlatRecord<EventLog> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
