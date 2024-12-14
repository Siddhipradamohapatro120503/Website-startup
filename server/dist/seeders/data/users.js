"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersData = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.usersData = [
    {
        email: 'admin@example.com',
        password: bcryptjs_1.default.hashSync('admin123', 10),
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        isActive: true,
        lastLogin: new Date()
    },
    {
        email: 'hello@example.com',
        password: bcryptjs_1.default.hashSync('admin123', 10),
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        isActive: true,
        lastLogin: new Date()
    },
    {
        email: 'abhay@example.com',
        password: bcryptjs_1.default.hashSync('admin123', 10),
        firstName: 'Abhay',
        lastName: 'Admin',
        role: 'admin',
        isActive: true,
        lastLogin: new Date()
    },
    {
        email: 'john.doe@example.com',
        password: bcryptjs_1.default.hashSync('user123', 10),
        firstName: 'John',
        lastName: 'Doe',
        role: 'user',
        isActive: true,
        lastLogin: new Date()
    },
    {
        email: 'jane.smith@example.com',
        password: bcryptjs_1.default.hashSync('user123', 10),
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'user',
        isActive: true,
        lastLogin: new Date()
    },
    {
        email: 'mike.wilson@example.com',
        password: bcryptjs_1.default.hashSync('user123', 10),
        firstName: 'Mike',
        lastName: 'Wilson',
        role: 'user',
        isActive: false,
        lastLogin: new Date()
    },
    {
        email: 'sarah.johnson@example.com',
        password: bcryptjs_1.default.hashSync('user123', 10),
        firstName: 'Sarah',
        lastName: 'Johnson',
        role: 'user',
        isActive: true,
        lastLogin: new Date()
    }
];
