"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
let TaskGateway = class TaskGateway {
    configService;
    server;
    constructor(configService) {
        this.configService = configService;
    }
    handleConnection(client) {
        const token = client.handshake.auth?.token;
        if (!token)
            return client.disconnect();
        try {
            const decoded = jwt.verify(token, this.configService.getOrThrow('jwt.secret'));
            const userId = decoded.sub;
            client.data.user = decoded;
            if (typeof userId === 'string') {
                client.join(userId);
            }
            console.log(`✅ ${decoded?.email} connected and joined room ${userId}`);
        }
        catch (err) {
            console.log('❌ Invalid token', err);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        const user = client.data.user;
        console.log(`🔌 ${user?.email ?? 'Unknown user'} disconnected`);
    }
    emitTaskEvent(event, payload, userId) {
        if (userId) {
            this.server.to(userId).emit(`task.${event}`, payload);
            console.log(`Emitting task.${event} to user ${userId}`, payload);
        }
        else {
            console.log('------');
        }
    }
};
exports.TaskGateway = TaskGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], TaskGateway.prototype, "server", void 0);
exports.TaskGateway = TaskGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: '*', credentials: true },
    }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TaskGateway);
//# sourceMappingURL=websocket.gateway.js.map