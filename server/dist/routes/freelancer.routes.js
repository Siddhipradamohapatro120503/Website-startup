"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const freelancer_controller_1 = require("../controllers/freelancer.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Protected routes - require authentication
router.get('/profile', auth_1.auth, freelancer_controller_1.getFreelancerProfile);
router.put('/profile', auth_1.auth, freelancer_controller_1.updateFreelancerProfile);
router.delete('/:id', auth_1.auth, freelancer_controller_1.deleteFreelancer);
exports.default = router;
