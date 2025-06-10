"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const path = require("path");
const task_entity_1 = require("../task/task.entity");
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const dbConfig = {
    host: process.env['POSTGRES_HOST'],
    port: parseInt(process.env['POSTGRES_PORT'] || '5432'),
    username: process.env['POSTGRES_USER'],
    password: process.env['POSTGRES_PASSWORD'],
    database: process.env['POSTGRES_DB'],
};
console.log('Database Config:', {
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    database: dbConfig.database,
    password: dbConfig.password ? '****' : 'MISSING',
});
const dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities: [user_entity_1.User, task_entity_1.Task],
    synchronize: false,
});
async function seedAdmin() {
    try {
        await dataSource.initialize();
        console.log('Database connected');
        const userRepository = dataSource.getRepository(user_entity_1.User);
        const existingAdmin = await userRepository.findOne({
            where: { email: 'admin@example.com' },
        });
        if (existingAdmin) {
            console.log('Admin user already exists');
            return;
        }
        const adminUser = userRepository.create({
            email: 'admin@gmail.com',
            password: await bcrypt.hash('admin123', 10),
            role: 'ADMIN',
        });
        await userRepository.save(adminUser);
        console.log('Admin user created successfully');
    }
    catch (error) {
        console.error('Error seeding admin user:', error.message);
    }
    finally {
        if (dataSource.isInitialized) {
            await dataSource.destroy();
            console.log('Database connection closed');
        }
    }
}
seedAdmin();
//# sourceMappingURL=seed.admin.js.map