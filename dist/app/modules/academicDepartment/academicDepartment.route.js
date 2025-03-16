"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const router = express_1.default.Router();
router.post('/create-academic-department', (0, validateRequest_1.validateRequest)(academicDepartment_validation_1.AcademicDepartmentValidation.createAcademicDepartmentValidationSchema), academicDepartment_controller_1.AcademicDepartmentControllers.createAcademicDepartment);
router.get('/', academicDepartment_controller_1.AcademicDepartmentControllers.getAllAcademicFaculties);
// will call a controller to fetch a single Academic Department data
router.get('/:departmentID', academicDepartment_controller_1.AcademicDepartmentControllers.getAcademicDepartment);
router.patch('/:departmentID', (0, validateRequest_1.validateRequest)(academicDepartment_validation_1.AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema), academicDepartment_controller_1.AcademicDepartmentControllers.updateAcademicDepartment);
exports.AcademicDepartmentRoutes = router;
