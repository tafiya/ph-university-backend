import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';

import { AdminValidation } from '../admin/admin.validation';
import { FacultyValidation } from '../faculty/faculty.validation';
import { studentValidation } from '../student/student.validation';
import { UserController } from './user.controller';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidation.createStudentValidationSchema),
  UserController.createStudent,
);
router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.createFacultyValidationSchema),
  UserController.createFaculty,
);
router.post(
  '/create-admin',
  validateRequest(AdminValidation.createAdminValidationSchema),
  UserController.createAdmin,
);
export const userRoutes = router;
