import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { studentControllers } from './student.controller';
import { studentValidation } from './student.validation';

const route = express.Router();

// will call a controller to fetch all student data
route.get('/', studentControllers.getAllStudent);
// will call a controller to fetch a single student data
route.get('/:studentID', studentControllers.getStudent);
route.patch(
  '/:studentID',
  validateRequest(studentValidation.updateStudentValidationSchema),
  studentControllers.updateStudent,
);
route.delete('/:studentID', studentControllers.deleteStudent);
export const studentsRoutes = route;
