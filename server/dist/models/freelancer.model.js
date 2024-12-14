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
    name: { type: String, required: true, trim: true },
    level: {
        type: Number,
        required: true,
        min: [0, 'Skill level cannot be less than 0'],
        max: [100, 'Skill level cannot be more than 100']
    }
});
const projectSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    status: {
        type: String,
        enum: {
            values: ['completed', 'in-progress', 'cancelled'],
            message: '{VALUE} is not a valid status'
        },
        default: 'in-progress'
    },
    clientRating: {
        type: Number,
        min: [0, 'Rating cannot be less than 0'],
        max: [5, 'Rating cannot be more than 5'],
        default: 0
    }
});
const freelancerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    avatar: { type: String },
    title: {
        type: String,
        required: [true, 'Professional title is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    bio: {
        type: String,
        trim: true
    },
    skills: [skillSchema],
    rating: {
        type: Number,
        default: 0,
        min: [0, 'Rating cannot be less than 0'],
        max: [5, 'Rating cannot be more than 5']
    },
    projects: [projectSchema],
    availability: {
        status: {
            type: String,
            enum: {
                values: ['available', 'busy', 'unavailable'],
                message: '{VALUE} is not a valid availability status'
            },
            default: 'available'
        },
        nextAvailable: { type: String }
    },
    metrics: {
        completedProjects: {
            type: Number,
            default: 0,
            min: [0, 'Completed projects cannot be negative']
        },
        totalEarnings: {
            type: Number,
            default: 0,
            min: [0, 'Total earnings cannot be negative']
        },
        avgResponseTime: {
            type: String,
            default: '24 hours'
        }
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Freelancer', freelancerSchema);
