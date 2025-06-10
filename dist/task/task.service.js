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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./task.entity");
const user_entity_1 = require("../users/user.entity");
const websocket_gateway_1 = require("../websocket/websocket.gateway");
const events_service_1 = require("../events/events.service");
let TaskService = class TaskService {
    taskRepository;
    taskGateway;
    eventLogService;
    constructor(taskRepository, taskGateway, eventLogService) {
        this.taskRepository = taskRepository;
        this.taskGateway = taskGateway;
        this.eventLogService = eventLogService;
    }
    async create(createTaskDto, user) {
        if (user.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Only admins can create tasks');
        }
        const task = this.taskRepository.create({
            ...createTaskDto,
            assignedTo: { id: createTaskDto.assignedToId },
        });
        const savedTask = await this.taskRepository.save(task);
        this.taskGateway.emitTaskEvent('created', savedTask, createTaskDto.assignedToId);
        await this.eventLogService.logEvent(savedTask.id, 'create', user, {
            message: 'Task created by admin',
        });
        return savedTask;
    }
    async findAll(user) {
        if (user.role === user_entity_1.UserRole.ADMIN) {
            return this.taskRepository.find();
        }
        return this.taskRepository.find({
            where: { assignedTo: { id: user.userId } },
        });
    }
    async findOne(id, user) {
        const task = await this.taskRepository.findOne({
            where: { id },
            relations: ['assignedTo'],
        });
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        if (user.role !== user_entity_1.UserRole.ADMIN && task.assignedTo.id !== user.userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return task;
    }
    async update(id, updateTaskDto, user) {
        const task = await this.findOne(id, user);
        const newAssignedToId = updateTaskDto.assignedToId
            ? updateTaskDto.assignedToId
            : task.assignedTo.id;
        const updatedTask = await this.taskRepository.save({
            ...task,
            ...updateTaskDto,
            assignedTo: { id: newAssignedToId },
        });
        this.taskGateway.emitTaskEvent('updated', updatedTask, newAssignedToId);
        await this.eventLogService.logEvent(task.id, 'create', user, {
            message: 'Task updated',
        });
        return updatedTask;
    }
    async delete(id, user) {
        if (user.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Only admins can delete tasks');
        }
        const task = await this.findOne(id, user);
        await this.taskRepository.remove(task);
        await this.eventLogService.logEvent(task.id, 'create', user, {
            message: 'Task deleted',
        });
        this.taskGateway.emitTaskEvent('deleted', task, task.assignedTo.id);
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        websocket_gateway_1.TaskGateway,
        events_service_1.EventsService])
], TaskService);
//# sourceMappingURL=task.service.js.map