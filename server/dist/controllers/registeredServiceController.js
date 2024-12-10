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
exports.updateServiceStatus = exports.registerService = exports.getRegisteredServices = void 0;
const RegisteredService_1 = __importDefault(require("../models/RegisteredService"));
const getRegisteredServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Get the user's email and role from the authenticated request
        const userEmail = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
        const userRole = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
        if (!userEmail) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        // If user is admin, return all services
        if (userRole === 'admin') {
            const services = yield RegisteredService_1.default.find({}).sort({ registrationDate: -1 });
            return res.json(services);
        }
        // For non-admin users, return only their services
        const services = yield RegisteredService_1.default.find({ userEmail }).sort({ registrationDate: -1 });
        res.json(services);
    }
    catch (error) {
        console.error('Error in getRegisteredServices:', error);
        res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
});
exports.getRegisteredServices = getRegisteredServices;
const registerService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Get the user's email from the authenticated request
        const userEmail = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
        if (!userEmail) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const service = new RegisteredService_1.default({
            serviceId: req.body.service.id,
            name: req.body.service.name,
            description: req.body.service.description,
            duration: req.body.service.duration,
            category: req.body.service.category,
            features: req.body.service.features,
            technologies: req.body.service.technologies,
            useCases: req.body.service.useCases,
            iconName: req.body.service.icon.name,
            userEmail: userEmail, // Add user email when registering service
            formData: req.body.formData
        });
        const newService = yield service.save();
        res.status(201).json(newService);
    }
    catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
});
exports.registerService = registerService;
const updateServiceStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
        const userEmail = (_b = req.user) === null || _b === void 0 ? void 0 : _b.email;
        if (!userEmail) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        // Allow admins to update any service
        const service = userRole === 'admin'
            ? yield RegisteredService_1.default.findById(req.params.id)
            : yield RegisteredService_1.default.findOne({ _id: req.params.id, userEmail });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        service.status = req.body.status;
        const updatedService = yield service.save();
        res.json(updatedService);
    }
    catch (error) {
        console.error('Error updating service status:', error);
        res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
});
exports.updateServiceStatus = updateServiceStatus;
