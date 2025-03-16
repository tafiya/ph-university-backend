"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const student_controller_1 = require("./student.controller");
const student_validation_1 = require("./student.validation");
const route = express_1.default.Router();
// will call a controller to fetch all student data
route.get('/', student_controller_1.studentControllers.getAllStudent);
// will call a controller to fetch a single student data
route.get('/:id', student_controller_1.studentControllers.getStudent);
route.patch('/:id', (0, validateRequest_1.validateRequest)(student_validation_1.studentValidation.updateStudentValidationSchema), student_controller_1.studentControllers.updateStudent);
route.delete('/:id', student_controller_1.studentControllers.deleteStudent);
exports.studentsRoutes = route;
