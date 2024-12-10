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
const RegisteredService_1 = __importDefault(require("../models/RegisteredService"));
const router = express_1.default.Router();
// Get all registered services
router.get('/services', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield RegisteredService_1.default.find();
        res.json(services);
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
}));
// Register a new service
router.post('/services', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        formData: req.body.formData
    });
    try {
        const newService = yield service.save();
        res.status(201).json(newService);
    }
    catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
}));
// Update service status
router.patch('/services/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield RegisteredService_1.default.findOne({ serviceId: req.params.id });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        service.status = req.body.status;
        const updatedService = yield service.save();
        res.json(updatedService);
    }
    catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
}));
exports.default = router;
