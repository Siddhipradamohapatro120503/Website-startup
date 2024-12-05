"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            console.log('No auth token found in request');
            return res.status(401).json({ message: 'No auth token found' });
        }
        console.log('Verifying token...');
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key-here');
        req.user = decoded;
        console.log('Token verified, user:', decoded);
        next();
    }
    catch (error) {
        console.error('Auth middleware error:', error);
        if (error instanceof Error) {
            res.status(401).json({ message: 'Invalid token', error: error.message });
        }
        else {
            res.status(401).json({ message: 'Invalid token', error: 'Unknown error occurred' });
        }
    }
};
exports.auth = auth;
const isAdmin = (req, res, next) => {
    try {
        console.log('Checking admin role for user:', req.user);
        if (req.user && req.user.role === 'admin') {
            next();
        }
        else {
            console.log('Access denied - user is not admin:', req.user);
            res.status(403).json({ message: 'Access denied. Admin only.' });
        }
    }
    catch (error) {
        console.error('Admin middleware error:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Server error', error: 'Unknown error occurred' });
        }
    }
};
exports.isAdmin = isAdmin;
