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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const websocket_gateway_1 = require("../websocket/websocket.gateway");
const events_service_1 = require("../events/events.service");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    userRepository;
    taskGateway;
    eventLogService;
    constructor(userRepository, taskGateway, eventLogService) {
        this.userRepository = userRepository;
        this.taskGateway = taskGateway;
        this.eventLogService = eventLogService;
    }
    async findAll(user) {
        if (user.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.NotFoundException('Only admins can view all users');
        }
        return this.userRepository
            .createQueryBuilder('user')
            .where('user.role = :role', { role: user_entity_1.UserRole.USER })
            .select(['user.id', 'user.email', 'user.role'])
            .getMany();
    }
    async updatePassword(password, user) {
        const foundUser = await this.userRepository.findOne({
            where: { id: user.userId },
        });
        if (!foundUser) {
            throw new common_1.NotFoundException('User not found');
        }
        foundUser.password = await bcrypt.hash(password, 10);
        await this.userRepository.save(foundUser);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        websocket_gateway_1.TaskGateway,
        events_service_1.EventsService])
], UsersService);
//# sourceMappingURL=users.service.js.map