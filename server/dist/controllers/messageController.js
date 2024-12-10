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
exports.markMessagesAsRead = exports.sendMessage = exports.getServiceMessages = void 0;
const Message_1 = __importDefault(require("../models/Message"));
const mongoose_1 = __importDefault(require("mongoose"));
const getServiceMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { serviceId } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const userRole = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(serviceId)) {
            return res.status(400).json({ message: 'Invalid service ID format' });
        }
        const messages = yield Message_1.default.find({
            serviceId: new mongoose_1.default.Types.ObjectId(serviceId)
        }).sort({ timestamp: 1 });
        res.json(messages);
    }
    catch (error) {
        console.error('Error getting messages:', error);
        res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
});
exports.getServiceMessages = getServiceMessages;
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { serviceId } = req.params;
        const { content } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const userRole = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(serviceId)) {
            return res.status(400).json({ message: 'Invalid service ID format' });
        }
        const message = new Message_1.default({
            serviceId: new mongoose_1.default.Types.ObjectId(serviceId),
            senderId: userId,
            senderRole: userRole,
            content,
        });
        const savedMessage = yield message.save();
        res.status(201).json(savedMessage);
    }
    catch (error) {
        console.error('Error sending message:', error);
        res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
});
exports.sendMessage = sendMessage;
const markMessagesAsRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { serviceId } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const userRole = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(serviceId)) {
            return res.status(400).json({ message: 'Invalid service ID format' });
        }
        yield Message_1.default.updateMany({
            serviceId: new mongoose_1.default.Types.ObjectId(serviceId),
            senderId: { $ne: userId },
        }, { read: true });
        res.json({ message: 'Messages marked as read' });
    }
    catch (error) {
        console.error('Error marking messages as read:', error);
        res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
});
exports.markMessagesAsRead = markMessagesAsRead;
