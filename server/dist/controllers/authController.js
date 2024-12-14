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
exports.freelancerLogin = exports.freelancerRegister = exports.getCurrentUser = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const Freelancer_1 = __importDefault(require("../models/Freelancer"));
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({
        id: user._id,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET || 'your-secret-key-here', { expiresIn: '24h' });
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, firstName, lastName } = req.body;
        // Check if user already exists
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
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
        res.status(500).json({ message: 'Error registering user', error });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find user
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Check password
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Update last login
        user.lastLogin = new Date();
        yield user.save();
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
        res.status(500).json({ message: 'Error logging in', error });
    }
});
exports.login = login;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const user = yield User_1.default.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
});
exports.getCurrentUser = getCurrentUser;
const freelancerRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, firstName, lastName, title, bio, skills, hourlyRate, } = req.body;
        // Check if user already exists
        const existingUser = yield Freelancer_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        // Validate skills array
        if (!Array.isArray(skills)) {
            return res.status(400).json({ message: 'Skills must be an array' });
        }
        // Validate each skill
        for (const skill of skills) {
            if (!skill.name || typeof skill.name !== 'string') {
                return res.status(400).json({ message: 'Each skill must have a name' });
            }
            if (!Number.isInteger(skill.level) || skill.level < 0 || skill.level > 100) {
                return res.status(400).json({
                    message: 'Skill level must be a whole number between 0 and 100',
                    skill: skill.name
                });
            }
        }
        // Create new freelancer
        const freelancer = new Freelancer_1.default({
            email,
            password,
            firstName,
            lastName,
            title,
            bio,
            skills,
            hourlyRate,
            role: 'freelancer',
            availability: {
                status: 'available'
            },
            metrics: {
                completedProjects: 0,
                totalEarnings: 0
            },
            rating: 0,
            isActive: true
        });
        yield freelancer.save();
        // Generate token
        const token = generateToken(freelancer);
        // Return user data without password
        const freelancerData = {
            _id: freelancer._id,
            email: freelancer.email,
            firstName: freelancer.firstName,
            lastName: freelancer.lastName,
            title: freelancer.title,
            bio: freelancer.bio,
            skills: freelancer.skills,
            hourlyRate: freelancer.hourlyRate,
            role: freelancer.role,
            availability: freelancer.availability,
            metrics: freelancer.metrics,
            rating: freelancer.rating,
            isActive: freelancer.isActive
        };
        res.status(201).json({
            token,
            user: freelancerData,
        });
    }
    catch (error) {
        console.error('Freelancer registration error:', error);
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Registration failed',
            error,
        });
    }
});
exports.freelancerRegister = freelancerRegister;
const freelancerLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find freelancer
        const freelancer = yield Freelancer_1.default.findOne({ email });
        if (!freelancer) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Check password
        const isMatch = yield freelancer.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate token
        const token = generateToken(freelancer);
        res.json({
            token,
            user: {
                id: freelancer._id,
                email: freelancer.email,
                firstName: freelancer.firstName,
                lastName: freelancer.lastName,
                title: freelancer.title,
                bio: freelancer.bio,
                skills: freelancer.skills,
                hourlyRate: freelancer.hourlyRate,
                availability: freelancer.availability,
                metrics: freelancer.metrics,
                rating: freelancer.rating,
                role: freelancer.role,
            },
        });
    }
    catch (error) {
        console.error('Freelancer login error:', error);
        res.status(500).json({
            message: 'Error logging in',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.freelancerLogin = freelancerLogin;
