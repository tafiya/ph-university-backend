"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const course_controller_1 = require("./course.controller");
const course_validation_1 = require("./course.validation");
const router = express_1.default.Router();
router.post('/create-course', (0, validateRequest_1.validateRequest)(course_validation_1.CourseValidation.createCourseValidationSchema), course_controller_1.CourseControllers.createCourse);
router.get('/', course_controller_1.CourseControllers.getAllCourses);
router.get('/:id', course_controller_1.CourseControllers.getSingleCourse);
router.patch('/:id', (0, validateRequest_1.validateRequest)(course_validation_1.CourseValidation.updateCourseValidationSchema), course_controller_1.CourseControllers.updateCourse);
router.put('/:courseId/assign-faculty', (0, validateRequest_1.validateRequest)(course_validation_1.CourseValidation.courseFacultiesValidationSchema), course_controller_1.CourseControllers.assignFaculties);
router.delete('/:courseId/remove-faculty', (0, validateRequest_1.validateRequest)(course_validation_1.CourseValidation.courseFacultiesValidationSchema), course_controller_1.CourseControllers.removeFaculties);
router.delete('/:id', course_controller_1.CourseControllers.deleteCourse);
exports.CourseRoutes = router;
