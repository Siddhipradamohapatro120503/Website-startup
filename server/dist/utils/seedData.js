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
exports.initializeDatabase = exports.seedServices = exports.seedAdminUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const Service_1 = __importDefault(require("../models/Service"));
const initialServices = [
    {
        name: 'Business Consulting',
        description: 'Expert guidance for your business growth and strategy',
        price: 299,
        duration: '3 months',
        category: 'Consulting',
        features: [
            'Weekly strategy sessions',
            'Market analysis',
            'Growth planning',
            'Performance tracking'
        ]
    },
    {
        name: 'Digital Marketing',
        description: 'Comprehensive digital marketing solutions',
        price: 199,
        duration: '1 month',
        category: 'Marketing',
        features: [
            'Social media management',
            'Content creation',
            'SEO optimization',
            'Analytics reporting'
        ]
    },
    {
        name: 'Web Development',
        description: 'Professional web development services',
        price: 599,
        duration: '2 months',
        category: 'Development',
        features: [
            'Custom design',
            'Responsive development',
            'CMS integration',
            'Performance optimization'
        ]
    }
];
const seedAdminUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if admin user already exists
        const adminExists = yield User_1.default.findOne({ email: 'admin@example.com' });
        if (!adminExists) {
            // Create admin user
            const adminUser = new User_1.default({
                email: 'admin@example.com',
                password: 'admin123', // This will be hashed by the User model pre-save hook
                firstName: 'Admin',
                lastName: 'User',
                role: 'admin',
                isActive: true,
            });
            yield adminUser.save();
            console.log('Admin user created successfully');
            console.log('Admin credentials:');
            console.log('Email: admin@example.com');
            console.log('Password: admin123');
        }
        else {
            console.log('Admin user already exists');
        }
    }
    catch (error) {
        console.error('Error seeding admin user:', error);
    }
});
exports.seedAdminUser = seedAdminUser;
const seedServices = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if services exist
        const servicesCount = yield Service_1.default.countDocuments();
        if (servicesCount === 0) {
            // Create initial services
            yield Service_1.default.insertMany(initialServices);
            console.log('Initial services created successfully');
        }
        else {
            console.log('Services already exist');
        }
    }
    catch (error) {
        console.error('Error seeding services:', error);
    }
});
exports.seedServices = seedServices;
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, exports.seedAdminUser)();
        yield (0, exports.seedServices)();
        console.log('Database seeding completed');
    }
    catch (error) {
        console.error('Error initializing database:', error);
    }
});
exports.initializeDatabase = initializeDatabase;
