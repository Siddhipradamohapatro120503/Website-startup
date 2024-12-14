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
exports.deleteFreelancer = exports.getFreelancerProfile = exports.updateFreelancerProfile = exports.updateFreelancer = exports.createFreelancer = exports.getFreelancerById = exports.getAllFreelancers = void 0;
const Freelancer_1 = __importDefault(require("../models/Freelancer"));
const getAllFreelancers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const freelancers = yield Freelancer_1.default.find().select('-password');
        // Transform the data to match the frontend interface
        const transformedFreelancers = freelancers.map(freelancer => ({
            _id: freelancer._id,
            email: freelancer.email,
            firstName: freelancer.firstName,
            lastName: freelancer.lastName,
            name: `${freelancer.firstName} ${freelancer.lastName}`,
            title: freelancer.title,
            bio: freelancer.bio,
            phone: freelancer.phone,
            location: freelancer.location,
            avatar: freelancer.avatar,
            skills: freelancer.skills,
            projects: freelancer.projects,
            hourlyRate: freelancer.hourlyRate,
            availability: {
                status: freelancer.availability.status,
                nextAvailable: freelancer.availability.nextAvailable
            },
            metrics: {
                completedProjects: freelancer.metrics.completedProjects,
                totalEarnings: freelancer.metrics.totalEarnings,
                avgResponseTime: freelancer.metrics.avgResponseTime
            },
            rating: freelancer.rating,
            isActive: freelancer.isActive
        }));
        res.json(transformedFreelancers);
    }
    catch (error) {
        console.error('Error in getAllFreelancers:', error);
        res.status(500).json({
            message: error instanceof Error ? error.message : 'An error occurred',
            details: error
        });
    }
});
exports.getAllFreelancers = getAllFreelancers;
const getFreelancerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const freelancer = yield Freelancer_1.default.findById(req.params.id);
        if (!freelancer) {
            return res.status(404).json({ message: 'Freelancer not found' });
        }
        res.json(freelancer);
    }
    catch (error) {
        console.error('Error in getFreelancerById:', error);
        res.status(500).json({
            message: error instanceof Error ? error.message : 'An error occurred',
            details: error
        });
    }
});
exports.getFreelancerById = getFreelancerById;
const createFreelancer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Creating freelancer with data:', req.body);
        const freelancer = new Freelancer_1.default(req.body);
        yield freelancer.save();
        res.status(201).json(freelancer);
    }
    catch (error) {
        console.error('Error in createFreelancer:', error);
        if (error instanceof Error && error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation Error',
                details: error.message,
                error: error
            });
        }
        res.status(400).json({
            message: error instanceof Error ? error.message : 'An error occurred',
            details: error
        });
    }
});
exports.createFreelancer = createFreelancer;
const updateFreelancer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Updating freelancer with ID:', req.params.id);
        console.log('Update data:', req.body);
        // First validate the update data
        const updateData = req.body;
        if (updateData.skills) {
            updateData.skills = updateData.skills.map((skill) => ({
                name: skill.name,
                level: Number(skill.level)
            }));
        }
        if (updateData.projects) {
            updateData.projects = updateData.projects.map((project) => ({
                name: project.name,
                status: project.status,
                clientRating: Number(project.clientRating)
            }));
        }
        const freelancer = yield Freelancer_1.default.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
            context: 'query'
        });
        if (!freelancer) {
            return res.status(404).json({ message: 'Freelancer not found' });
        }
        res.json(freelancer);
    }
    catch (error) {
        console.error('Error in updateFreelancer:', error);
        if (error instanceof Error && error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation Error',
                details: error.message,
                error: error
            });
        }
        res.status(400).json({
            message: error instanceof Error ? error.message : 'An error occurred',
            details: error
        });
    }
});
exports.updateFreelancer = updateFreelancer;
const updateFreelancerProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore - user is added by auth middleware
        const freelancerId = req.user.id;
        const updateData = req.body;
        // Remove sensitive fields that shouldn't be updated directly
        delete updateData.password;
        delete updateData.email;
        delete updateData.role;
        const updatedFreelancer = yield Freelancer_1.default.findByIdAndUpdate(freelancerId, { $set: updateData }, { new: true, runValidators: true }).select('-password');
        if (!updatedFreelancer) {
            return res.status(404).json({ message: 'Freelancer not found' });
        }
        res.json(updatedFreelancer);
    }
    catch (error) {
        console.error('Error updating freelancer profile:', error);
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Failed to update profile',
            error
        });
    }
});
exports.updateFreelancerProfile = updateFreelancerProfile;
const getFreelancerProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore - user is added by auth middleware
        const freelancerId = req.user.id;
        const freelancer = yield Freelancer_1.default.findById(freelancerId)
            .select('-password')
            .populate('skills')
            .populate('projects');
        if (!freelancer) {
            return res.status(404).json({ message: 'Freelancer not found' });
        }
        res.json(freelancer);
    }
    catch (error) {
        console.error('Error fetching freelancer profile:', error);
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Failed to fetch profile',
            error
        });
    }
});
exports.getFreelancerProfile = getFreelancerProfile;
const deleteFreelancer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const freelancer = yield Freelancer_1.default.findByIdAndDelete(req.params.id);
        if (!freelancer) {
            return res.status(404).json({ message: 'Freelancer not found' });
        }
        res.json({ message: 'Freelancer deleted successfully' });
    }
    catch (error) {
        console.error('Error in deleteFreelancer:', error);
        res.status(500).json({
            message: error instanceof Error ? error.message : 'An error occurred',
            details: error
        });
    }
});
exports.deleteFreelancer = deleteFreelancer;
