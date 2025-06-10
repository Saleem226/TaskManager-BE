"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModule = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("./task.service");
const task_controller_1 = require("./task.controller");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const task_entity_1 = require("./task.entity");
const websocket_gateway_1 = require("../websocket/websocket.gateway");
const events_module_1 = require("../events/events.module");
let TaskModule = class TaskModule {
};
exports.TaskModule = TaskModule;
exports.TaskModule = TaskModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([task_entity_1.Task]), auth_module_1.AuthModule, events_module_1.EventsModule],
        providers: [task_service_1.TaskService, websocket_gateway_1.TaskGateway],
        controllers: [task_controller_1.TaskController],
    })
], TaskModule);
//# sourceMappingURL=task.module.js.map