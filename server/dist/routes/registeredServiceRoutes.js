"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registeredServiceController_1 = require("../controllers/registeredServiceController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Protected routes - require authentication
router.get('/', auth_1.auth, registeredServiceController_1.getRegisteredServices);
router.post('/', auth_1.auth, registeredServiceController_1.registerService);
router.patch('/:id', auth_1.auth, registeredServiceController_1.updateServiceStatus);
exports.default = router;
