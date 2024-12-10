"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
const isAdmin_1 = require("../middleware/isAdmin");
const router = (0, express_1.Router)();
// Protected admin routes
router.get('/', auth_1.auth, isAdmin_1.isAdmin, userController_1.getUsers);
router.patch('/:id/status', auth_1.auth, isAdmin_1.isAdmin, userController_1.updateUserStatus);
exports.default = router;
