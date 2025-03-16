import express from 'express';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { facultyControllers } from './faculty.controller';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.Admin, USER_ROLE.Faculty),
  facultyControllers.getAllFaculty,
);
router.get('/:id', facultyControllers.getFaculty);
router.delete('/:id', facultyControllers.deleteFaculty);
router.patch('/:id', facultyControllers.updateFaculty);

export const facultyRoutes = router;
