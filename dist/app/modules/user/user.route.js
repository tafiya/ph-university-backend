"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const auth_1 = require("../../middleware/auth");
const admin_validation_1 = require("../admin/admin.validation");
const faculty_validation_1 = require("../faculty/faculty.validation");
const student_validation_1 = require("../student/student.validation");
const user_constant_1 = require("./user.constant");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post('/create-student', (0, auth_1.auth)(user_constant_1.USER_ROLE.Admin), (0, validateRequest_1.validateRequest)(student_validation_1.studentValidation.createStudentValidationSchema), user_controller_1.UserController.createStudent);
router.post('/create-faculty', (0, auth_1.auth)(user_constant_1.USER_ROLE.Admin), (0, validateRequest_1.validateRequest)(faculty_validation_1.FacultyValidation.createFacultyValidationSchema), user_controller_1.UserController.createFaculty);
router.post('/create-admin', (0, validateRequest_1.validateRequest)(admin_validation_1.AdminValidation.createAdminValidationSchema), user_controller_1.UserController.createAdmin);
exports.userRoutes = router;
