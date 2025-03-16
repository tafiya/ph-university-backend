"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const academicSemester_controller_1 = require("./academicSemester.controller");
const academicSemester_validate_1 = require("./academicSemester.validate");
const router = express_1.default.Router();
router.post('/create-academic-semester', (0, validateRequest_1.validateRequest)(academicSemester_validate_1.AcademicSemesterValidations.createAcademicSemesterValidationSchema), academicSemester_controller_1.AcademicSemesterControllers.createStudent);
router.get('/', academicSemester_controller_1.AcademicSemesterControllers.getAllAcademicSemesters);
// will call a controller to fetch a single Academic Semester data
router.get('/:academicID', academicSemester_controller_1.AcademicSemesterControllers.getAcademicSemester);
router.patch('/:academicID', (0, validateRequest_1.validateRequest)(academicSemester_validate_1.AcademicSemesterValidations.updateAcademicSemesterValidationSchema), academicSemester_controller_1.AcademicSemesterControllers.updateAcademicSemester);
exports.AcademicSemesterRoutes = router;
