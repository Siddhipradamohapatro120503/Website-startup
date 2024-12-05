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
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const RegisteredService_1 = __importDefault(require("../models/RegisteredService"));
const Freelancer_1 = __importDefault(require("../models/Freelancer"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
// Get all registered services
router.get('/services/registered', auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Fetching registered services...');
    try {
        // Force fresh data by setting Cache-Control header
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        const services = yield RegisteredService_1.default.find()
            .populate('userId', 'firstName lastName email')
            .populate('serviceId', 'name description')
            .populate('freelancerId', 'name email skills');
        console.log('Found services:', services.length);
        console.log('Services data:', JSON.stringify(services, null, 2));
        // Check if services array is empty
        if (!services || services.length === 0) {
            console.log('No registered services found in database');
            return res.status(200).json([]);
        }
        res.json(services);
    }
    catch (error) {
        console.error('Error fetching registered services:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error fetching registered services', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Error fetching registered services', error: 'Unknown error occurred' });
        }
    }
}));
// Get all freelancers
router.get('/freelancers', auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Fetching freelancers... Request from:', req.user);
    try {
        // Force fresh data
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        console.log('Querying Freelancer model...');
        const freelancers = yield Freelancer_1.default.find().select('-password');
        console.log('Found freelancers:', freelancers.length);
        console.log('Freelancer data:', JSON.stringify(freelancers, null, 2));
        // Check if freelancers array is empty
        if (!freelancers || freelancers.length === 0) {
            console.log('No freelancers found in database');
            return res.status(200).json([]);
        }
        res.json(freelancers);
    }
    catch (error) {
        console.error('Error fetching freelancers:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error fetching freelancers', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Error fetching freelancers', error: 'Unknown error occurred' });
        }
    }
}));
// Test endpoint
router.get('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Force fresh data
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.json({ message: 'Admin routes are working' });
}));
// Update registered service status
router.patch('/services/registered/:id/status', auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        console.log(`Updating service ${req.params.id} status to: ${status}`);
        const service = yield RegisteredService_1.default.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('userId freelancerId');
        if (!service) {
            console.log(`Service not found with id: ${req.params.id}`);
            return res.status(404).json({ message: 'Service not found' });
        }
        console.log('Updated service:', service);
        res.json(service);
    }
    catch (error) {
        console.error('Error updating service status:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error updating service status', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Error updating service status', error: 'Unknown error occurred' });
        }
    }
}));
// Assign freelancer to service
router.patch('/services/registered/:id/assign', auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { freelancerId } = req.body;
        console.log(`Assigning freelancer ${freelancerId} to service ${req.params.id}`);
        const service = yield RegisteredService_1.default.findByIdAndUpdate(req.params.id, {
            freelancerId,
            status: 'approved'
        }, { new: true }).populate('userId freelancerId');
        if (!service) {
            console.log(`Service not found with id: ${req.params.id}`);
            return res.status(404).json({ message: 'Service not found' });
        }
        console.log('Updated service:', service);
        res.json(service);
    }
    catch (error) {
        console.error('Error assigning freelancer:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error assigning freelancer', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Error assigning freelancer', error: 'Unknown error occurred' });
        }
    }
}));
// Get all users with filtering and sorting
router.get('/users', auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Fetching users... Request from:', req.user);
    try {
        // Force fresh data
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        // Build query conditions
        const conditions = {};
        // Add filters if provided in query params
        if (req.query.role) {
            conditions.role = req.query.role;
        }
        if (req.query.isActive !== undefined) {
            conditions.isActive = req.query.isActive === 'true';
        }
        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');
            conditions.$or = [
                { firstName: searchRegex },
                { lastName: searchRegex },
                { email: searchRegex }
            ];
        }
        console.log('Query conditions:', conditions);
        // Execute query with conditions
        const users = yield User_1.default.find(conditions)
            .select('-password')
            .sort({ createdAt: -1 });
        console.log(`Found ${users.length} users`);
        console.log('Users data:', JSON.stringify(users, null, 2));
        res.json({
            total: users.length,
            users: users
        });
    }
    catch (error) {
        console.error('Error fetching users:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error fetching users', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Error fetching users', error: 'Unknown error occurred' });
        }
    }
}));
// Update user status
router.patch('/users/:id/status', auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        console.log(`Updating user ${req.params.id} status to: ${status}`);
        const user = yield User_1.default.findByIdAndUpdate(req.params.id, { status }, { new: true }).select('-password');
        if (!user) {
            console.log(`User not found with id: ${req.params.id}`);
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('Updated user:', user);
        res.json(user);
    }
    catch (error) {
        console.error('Error updating user status:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error updating user status', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Error updating user status', error: 'Unknown error occurred' });
        }
    }
}));
// Delete user
router.delete('/users/:id', auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Deleting user ${req.params.id}`);
        const user = yield User_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            console.log(`User not found with id: ${req.params.id}`);
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('Deleted user:', user);
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error deleting user', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Error deleting user', error: 'Unknown error occurred' });
        }
    }
}));
exports.default = router;
