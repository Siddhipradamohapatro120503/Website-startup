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
exports.toggleIntegration = exports.deleteIntegration = exports.updateIntegration = exports.createIntegration = exports.getIntegration = exports.getIntegrations = void 0;
const Integration_1 = __importDefault(require("../models/Integration"));
const getIntegrations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, category, status } = req.query;
        let query = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        if (category) {
            query.category = category;
        }
        if (status) {
            query.status = status;
        }
        const integrations = yield Integration_1.default.find(query);
        res.json(integrations);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching integrations', error });
    }
});
exports.getIntegrations = getIntegrations;
const getIntegration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const integration = yield Integration_1.default.findById(req.params.id);
        if (!integration) {
            return res.status(404).json({ message: 'Integration not found' });
        }
        res.json(integration);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching integration', error });
    }
});
exports.getIntegration = getIntegration;
const createIntegration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const integration = new Integration_1.default(req.body);
        yield integration.save();
        res.status(201).json(integration);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating integration', error });
    }
});
exports.createIntegration = createIntegration;
const updateIntegration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const integration = yield Integration_1.default.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!integration) {
            return res.status(404).json({ message: 'Integration not found' });
        }
        res.json(integration);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating integration', error });
    }
});
exports.updateIntegration = updateIntegration;
const deleteIntegration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const integration = yield Integration_1.default.findByIdAndDelete(req.params.id);
        if (!integration) {
            return res.status(404).json({ message: 'Integration not found' });
        }
        res.json({ message: 'Integration deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting integration', error });
    }
});
exports.deleteIntegration = deleteIntegration;
const toggleIntegration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const integration = yield Integration_1.default.findById(req.params.id);
        if (!integration) {
            return res.status(404).json({ message: 'Integration not found' });
        }
        // Toggle the status
        integration.status = integration.status === 'connected' ? 'disconnected' : 'connected';
        // Simulate integration connection/disconnection process
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (integration.status === 'connected') {
                    integration.config.set('lastConnected', new Date());
                    integration.config.set('connectionStatus', 'healthy');
                }
                else {
                    integration.config.set('lastDisconnected', new Date());
                    integration.config.delete('connectionStatus');
                }
                yield integration.save();
            }
            catch (error) {
                integration.status = integration.status === 'connected' ? 'disconnected' : 'connected';
                yield integration.save();
            }
        }), 2000);
        yield integration.save();
        res.json(integration);
    }
    catch (error) {
        res.status(500).json({ message: 'Error toggling integration', error });
    }
});
exports.toggleIntegration = toggleIntegration;
