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
const freelancer_model_1 = __importDefault(require("../models/freelancer.model"));
const router = express_1.default.Router();
// Create a new freelancer
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const freelancer = new freelancer_model_1.default(req.body);
        yield freelancer.save();
        res.status(201).json(freelancer);
    }
    catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
}));
// Get all freelancers
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const freelancers = yield freelancer_model_1.default.find();
        res.json(freelancers);
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
}));
// Get a single freelancer
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const freelancer = yield freelancer_model_1.default.findById(req.params.id);
        if (!freelancer) {
            return res.status(404).json({ message: 'Freelancer not found' });
        }
        res.json(freelancer);
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
}));
// Update a freelancer
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const freelancer = yield freelancer_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!freelancer) {
            return res.status(404).json({ message: 'Freelancer not found' });
        }
        res.json(freelancer);
    }
    catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
}));
// Delete a freelancer
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const freelancer = yield freelancer_model_1.default.findByIdAndDelete(req.params.id);
        if (!freelancer) {
            return res.status(404).json({ message: 'Freelancer not found' });
        }
        res.json({ message: 'Freelancer deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
}));
exports.default = router;
