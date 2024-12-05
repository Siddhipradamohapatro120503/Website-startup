"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
const freelancers_1 = require("./data/freelancers");
const services_1 = require("./data/services");
const users_1 = require("./data/users");
const registeredServices_1 = require("./data/registeredServices");
const Freelancer_1 = __importDefault(require("../models/Freelancer"));
const Service_1 = __importDefault(require("../models/Service"));
const User_1 = __importDefault(require("../models/User"));
const RegisteredService_1 = __importDefault(require("../models/RegisteredService"));
(0, dotenv_1.config)();
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Starting database initialization...');
        // Clear existing data
        console.log('Clearing existing data...');
        yield Promise.all([
            User_1.default.deleteMany({}),
            Freelancer_1.default.deleteMany({}),
            Service_1.default.deleteMany({}),
            RegisteredService_1.default.deleteMany({})
        ]);
        console.log('Existing data cleared successfully');
        // Seed Users
        console.log('Seeding users...');
        const users = yield User_1.default.insertMany(users_1.usersData);
        console.log(`Seeded ${users.length} users successfully`);
        console.log('Sample user:', users[0]);
        // Seed Freelancers
        console.log('Seeding freelancers...');
        const freelancers = yield Freelancer_1.default.insertMany(freelancers_1.freelancersData);
        console.log(`Seeded ${freelancers.length} freelancers successfully`);
        // Seed Services
        console.log('Seeding services...');
        const services = yield Service_1.default.insertMany(services_1.servicesData);
        console.log(`Seeded ${services.length} services successfully`);
        // Prepare RegisteredServices with references
        console.log('Preparing registered services...');
        const preparedRegisteredServices = registeredServices_1.registeredServicesData.map((service, index) => (Object.assign(Object.assign({}, service), { userId: users[index % users.length]._id, serviceId: services[index % services.length]._id, freelancerId: index % 2 === 0 ? freelancers[index % freelancers.length]._id : undefined })));
        // Seed RegisteredServices
        console.log('Seeding registered services...');
        const registeredServices = yield RegisteredService_1.default.insertMany(preparedRegisteredServices);
        console.log(`Seeded ${registeredServices.length} registered services successfully`);
        console.log('Database initialization completed successfully!');
        // Verify seeded data
        const userCount = yield User_1.default.countDocuments();
        const freelancerCount = yield Freelancer_1.default.countDocuments();
        const serviceCount = yield Service_1.default.countDocuments();
        const registeredServiceCount = yield RegisteredService_1.default.countDocuments();
        console.log('\nDatabase Status:');
        console.log(`- Users: ${userCount}`);
        console.log(`- Freelancers: ${freelancerCount}`);
        console.log(`- Services: ${serviceCount}`);
        console.log(`- Registered Services: ${registeredServiceCount}`);
        return true;
    }
    catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
});
exports.initializeDatabase = initializeDatabase;
// If this file is run directly, execute the seeder
if (require.main === module) {
    mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/startup-platform')
        .then(() => {
        console.log('Connected to MongoDB...');
        return (0, exports.initializeDatabase)();
    })
        .then(() => {
        console.log('Seeding completed successfully');
        process.exit(0);
    })
        .catch((error) => {
        console.error('Error seeding database:', error);
        process.exit(1);
    });
}
