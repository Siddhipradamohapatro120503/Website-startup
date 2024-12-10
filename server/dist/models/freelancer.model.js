"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const skillSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    level: { type: Number, required: true, min: 0, max: 100 }
});
const projectSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    status: {
        type: String,
        enum: ['completed', 'in-progress', 'cancelled'],
        default: 'in-progress'
    },
    clientRating: { type: Number, min: 0, max: 5 }
});
const freelancerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    avatar: { type: String },
    title: { type: String, required: true },
    skills: [skillSchema],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    projects: [projectSchema],
    availability: {
        status: {
            type: String,
            enum: ['available', 'busy', 'unavailable'],
            default: 'available'
        },
        nextAvailable: { type: Date }
    },
    metrics: {
        completedProjects: { type: Number, default: 0 },
        totalEarnings: { type: Number, default: 0 },
        avgResponseTime: { type: String }
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Freelancer', freelancerSchema);
