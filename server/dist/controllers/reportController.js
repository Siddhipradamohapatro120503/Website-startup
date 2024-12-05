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
exports.generateReport = exports.deleteReport = exports.updateReport = exports.createReport = exports.getReport = exports.getReports = void 0;
const Report_1 = __importDefault(require("../models/Report"));
const getReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, category, dateRange } = req.query;
        let query = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } }
            ];
        }
        if (category) {
            query.category = category;
        }
        if (dateRange) {
            const date = new Date();
            switch (dateRange) {
                case 'last7':
                    date.setDate(date.getDate() - 7);
                    break;
                case 'last30':
                    date.setDate(date.getDate() - 30);
                    break;
                case 'last90':
                    date.setDate(date.getDate() - 90);
                    break;
            }
            query.lastGenerated = { $gte: date };
        }
        const reports = yield Report_1.default.find(query).sort({ lastGenerated: -1 });
        res.json(reports);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching reports', error });
    }
});
exports.getReports = getReports;
const getReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const report = yield Report_1.default.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.json(report);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching report', error });
    }
});
exports.getReport = getReport;
const createReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const report = new Report_1.default(req.body);
        yield report.save();
        res.status(201).json(report);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating report', error });
    }
});
exports.createReport = createReport;
const updateReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const report = yield Report_1.default.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.json(report);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating report', error });
    }
});
exports.updateReport = updateReport;
const deleteReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const report = yield Report_1.default.findByIdAndDelete(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.json({ message: 'Report deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting report', error });
    }
});
exports.deleteReport = deleteReport;
const generateReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const report = yield Report_1.default.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        // Update status to Processing
        report.status = 'Processing';
        yield report.save();
        // Simulate report generation
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                report.status = 'Completed';
                report.lastGenerated = new Date();
                report.data = {
                    // Sample generated data
                    metrics: {
                        totalRevenue: Math.random() * 100000,
                        userCount: Math.floor(Math.random() * 1000),
                        averageRating: (Math.random() * 5).toFixed(1)
                    },
                    trends: {
                        daily: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
                        weekly: Array.from({ length: 4 }, () => Math.floor(Math.random() * 1000))
                    }
                };
                yield report.save();
            }
            catch (error) {
                report.status = 'Failed';
                yield report.save();
            }
        }), 5000);
        res.json({ message: 'Report generation started', report });
    }
    catch (error) {
        res.status(500).json({ message: 'Error generating report', error });
    }
});
exports.generateReport = generateReport;
