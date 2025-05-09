"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reportController_1 = require("../controllers/reportController");
const router = (0, express_1.Router)();
router.get('/', reportController_1.getReports);
router.get('/:id', reportController_1.getReport);
router.post('/', reportController_1.createReport);
router.put('/:id', reportController_1.updateReport);
router.delete('/:id', reportController_1.deleteReport);
router.post('/:id/generate', reportController_1.generateReport);
exports.default = router;
