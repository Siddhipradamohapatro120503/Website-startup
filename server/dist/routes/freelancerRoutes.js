"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const freelancer_controller_1 = require("../controllers/freelancer.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Public routes
router.get('/', freelancer_controller_1.getAllFreelancers);
router.get('/:id', freelancer_controller_1.getFreelancerById);
// Protected routes
router.post('/', auth_1.auth, freelancer_controller_1.createFreelancer);
router.put('/:id', auth_1.auth, freelancer_controller_1.updateFreelancer);
router.delete('/:id', auth_1.auth, freelancer_controller_1.deleteFreelancer);
// Profile routes
router.get('/profile/me', auth_1.auth, freelancer_controller_1.getFreelancerProfile);
router.put('/profile/me', auth_1.auth, freelancer_controller_1.updateFreelancerProfile);
exports.default = router;
