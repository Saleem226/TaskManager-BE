import { EventsService } from './events.service';
import { Request } from 'express';
export declare class EventsController {
    private eventsService;
    constructor(eventsService: EventsService);
    getEvents(taskId: string | undefined, req: Request): Promise<import("./schemas/event-log.schema").EventLog[]>;
}
