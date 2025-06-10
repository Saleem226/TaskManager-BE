"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../users/user.entity");
const task_entity_1 = require("../task/task.entity");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (config) => {
                    const postgresUrl = config.get('POSTGRES_URL');
                    if (postgresUrl) {
                        return {
                            type: 'postgres',
                            url: postgresUrl,
                            entities: [user_entity_1.User, task_entity_1.Task],
                            synchronize: true,
                        };
                    }
                    return {
                        type: 'postgres',
                        host: config.get('POSTGRES_HOST'),
                        port: config.get('POSTGRES_PORT'),
                        username: config.get('POSTGRES_USER'),
                        password: config.get('POSTGRES_PASSWORD'),
                        database: config.get('POSTGRES_DB'),
                        entities: [user_entity_1.User, task_entity_1.Task],
                        autoLoadEntities: true,
                        synchronize: true,
                    };
                },
                inject: [config_1.ConfigService],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (config) => ({
                    uri: config.get('database.mongo'),
                }),
                inject: [config_1.ConfigService],
            }),
        ],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map