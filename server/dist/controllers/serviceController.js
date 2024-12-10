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
exports.deleteService = exports.updateService = exports.createService = exports.getService = exports.getServices = void 0;
const Service_1 = __importDefault(require("../models/Service"));
const getServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Received query params:', req.query);
        const { category, search } = req.query;
        // Build filter object
        const filter = {};
        if (category && category !== 'all') {
            filter.category = category;
        }
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        console.log('Constructed filter:', filter);
        const services = yield Service_1.default.find(filter).sort({ createdAt: -1 });
        console.log('Found services:', services.length);
        res.json(services);
    }
    catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Error fetching services', error: error instanceof Error ? error.message : error });
    }
});
exports.getServices = getServices;
const getService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield Service_1.default.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json(service);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching service', error });
    }
});
exports.getService = getService;
const createService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if service with same name already exists
        const existingService = yield Service_1.default.findOne({ name: req.body.name });
        if (existingService) {
            return res.status(409).json({
                message: 'Service already exists',
                service: existingService
            });
        }
        const service = new Service_1.default(Object.assign(Object.assign({}, req.body), { metrics: {
                views: 0,
                bookings: 0,
                revenue: 0,
                rating: 0
            } }));
        yield service.save();
        res.status(201).json(service);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating service', error });
    }
});
exports.createService = createService;
const updateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield Service_1.default.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json(service);
    }
    catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ message: 'Error updating service', error });
    }
});
exports.updateService = updateService;
const deleteService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield Service_1.default.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json({ message: 'Service deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ message: 'Error deleting service', error });
    }
});
exports.deleteService = deleteService;
