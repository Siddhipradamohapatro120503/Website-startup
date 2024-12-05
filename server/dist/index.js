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
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const reportRoutes_1 = __importDefault(require("./routes/reportRoutes"));
const integrationRoutes_1 = __importDefault(require("./routes/integrationRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const serviceRoutes_1 = __importDefault(require("./routes/serviceRoutes"));
const admin_1 = __importDefault(require("./routes/admin"));
const seedData_1 = require("./utils/seedData");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Configure CORS
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // React app URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Middleware
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// Debug middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    console.log('Headers:', req.headers);
    next();
});
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/services', serviceRoutes_1.default);
app.use('/api/reports', reportRoutes_1.default);
app.use('/api/integrations', integrationRoutes_1.default);
app.use('/api/admin', admin_1.default);
// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/startup-platform';
mongoose_1.default.connect(MONGODB_URI)
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Connected to MongoDB');
    // Seed database with initial data
    yield (0, seedData_1.initializeDatabase)();
}))
    .catch((error) => {
    console.error('MongoDB connection error:', error);
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
