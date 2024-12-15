import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';

import { studentValidation } from '../student/student.validation';
import { UserController } from './user.controller';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidation.createStudentValidationSchema),
  UserController.createStudent,
);
export const userRoutes = router;
