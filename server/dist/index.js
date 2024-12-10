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
const registeredServiceRoutes_1 = __importDefault(require("./routes/registeredServiceRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const freelancer_routes_1 = __importDefault(require("./routes/freelancer.routes"));
const seedData_1 = require("./utils/seedData");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Accept-Language', 'Accept-Encoding'],
    exposedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Accept-Language', 'Accept-Encoding'],
    maxAge: 3600,
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/services', serviceRoutes_1.default);
app.use('/api/registered-services', registeredServiceRoutes_1.default);
app.use('/api/messages', messageRoutes_1.default);
app.use('/api/reports', reportRoutes_1.default);
app.use('/api/integrations', integrationRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/freelancers', freelancer_routes_1.default);
// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/startup-platform';
const PORT = process.env.PORT || 5000;
mongoose_1.default.connect(MONGODB_URI)
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Connected to MongoDB');
    yield (0, seedData_1.initializeDatabase)();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}))
    .catch((error) => {
    console.error('MongoDB connection error:', error);
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
