"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedDataSource = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("./users/user.entity");
const task_entity_1 = require("./task/task.entity");
const configService = new config_1.ConfigService();
exports.SeedDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: configService.get('database.postgres.host'),
    port: configService.get('database.postgres.port'),
    username: configService.get('database.postgres.username'),
    password: configService.get('database.postgres.password'),
    database: configService.get('database.postgres.db'),
    entities: [user_entity_1.User, task_entity_1.Task],
    synchronize: false,
});
//# sourceMappingURL=seed-data-source.js.map