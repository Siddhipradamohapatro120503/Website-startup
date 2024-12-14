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
const users_1 = require("./data/users");
const User_1 = __importDefault(require("../models/User"));
(0, dotenv_1.config)();
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Starting admin users seeding...');
        // Filter admin users
        const adminUsers = users_1.usersData.filter(user => user.role === 'admin');
        // Check for existing admin users and only add new ones
        for (const adminUser of adminUsers) {
            const existingUser = yield User_1.default.findOne({ email: adminUser.email });
            if (!existingUser) {
                const newUser = yield User_1.default.create(adminUser);
                console.log(`Added new admin user: ${newUser.email}`);
            } else {
                console.log(`Admin user already exists: ${adminUser.email}`);
            }
        }
        console.log('Admin users seeding completed successfully');
    }
    catch (error) {
        console.error('Error during admin users seeding:', error);
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
