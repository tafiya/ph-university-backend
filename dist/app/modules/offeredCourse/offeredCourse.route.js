"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.offeredCourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const offeredCourse_validate_1 = require("./offeredCourse.validate");
const offeredCpurse_controller_1 = require("./offeredCpurse.controller");
const router = express_1.default.Router();
router.get('/', offeredCpurse_controller_1.OfferedCourseControllers.getAllOfferedCourses);
router.get('/:id', offeredCpurse_controller_1.OfferedCourseControllers.getSingleOfferedCourses);
router.post('/create-offered-course', (0, validateRequest_1.validateRequest)(offeredCourse_validate_1.OfferedCourseValidations.createOfferedCourseValidationSchema), offeredCpurse_controller_1.OfferedCourseControllers.createOfferedCourse);
router.patch('/:id', (0, validateRequest_1.validateRequest)(offeredCourse_validate_1.OfferedCourseValidations.updateOfferedCourseValidationSchema), offeredCpurse_controller_1.OfferedCourseControllers.updateOfferedCourse);
router.delete('/:id', offeredCpurse_controller_1.OfferedCourseControllers.deleteOfferedCourseFromDB);
exports.offeredCourseRoutes = router;
