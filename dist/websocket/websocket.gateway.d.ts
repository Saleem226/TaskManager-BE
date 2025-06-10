import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'src/auth/auth.dto';
interface AuthenticatedSocket extends Socket {
    data: {
        user?: JwtPayload;
    };
}
export declare class TaskGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private configService;
    server: Server;
    constructor(configService: ConfigService);
    handleConnection(client: AuthenticatedSocket): AuthenticatedSocket | undefined;
    handleDisconnect(client: AuthenticatedSocket): void;
    emitTaskEvent(event: 'created' | 'updated' | 'deleted', payload: Record<string, any>, userId?: string): void;
}
export {};
