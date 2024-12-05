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
exports.getCurrentUser = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({
        id: user._id,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET || 'your-secret-key-here', { expiresIn: '24h' });
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Registering new user:', req.body);
        const { email, password, firstName, lastName } = req.body;
        // Check if user already exists
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            console.log('User already exists:', email);
            return res.status(400).json({ message: 'User already exists' });
        }
        // Create new user
        const user = new User_1.default({
            email,
            password,
            firstName,
            lastName,
        });
        yield user.save();
        console.log('New user created:', user._id);
        // Generate token
        const token = generateToken(user);
        res.status(201).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error('Error registering user:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error registering user', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Error registering user', error: 'Unknown error occurred' });
        }
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Login attempt for user:', req.body.email);
        const { email, password } = req.body;
        // Find user
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            console.log('User not found:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Check password
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            console.log('Invalid password for user:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Update last login
        user.lastLogin = new Date();
        yield user.save();
        console.log('User logged in successfully:', user._id);
        // Generate token
        const token = generateToken(user);
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error('Error logging in:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error logging in', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Error logging in', error: 'Unknown error occurred' });
        }
    }
});
exports.login = login;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Getting current user details');
        // @ts-ignore
        const userId = req.user.id;
        console.log('User ID from token:', userId);
        const user = yield User_1.default.findById(userId).select('-password');
        if (!user) {
            console.log('User not found with ID:', userId);
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('Found user:', user._id);
        res.json(user);
    }
    catch (error) {
        console.error('Error getting current user:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error getting current user', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Error getting current user', error: 'Unknown error occurred' });
        }
    }
});
exports.getCurrentUser = getCurrentUser;
