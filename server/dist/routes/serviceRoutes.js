"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviceController_1 = require("../controllers/serviceController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Public routes
router.get('/', serviceController_1.getServices);
router.get('/:id', serviceController_1.getService);
// Protected routes (admin only)
router.post('/', auth_1.auth, serviceController_1.createService);
router.put('/:id', auth_1.auth, serviceController_1.updateService);
router.delete('/:id', auth_1.auth, serviceController_1.deleteService);
exports.default = router;
