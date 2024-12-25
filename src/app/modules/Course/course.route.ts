import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { CourseControllers } from './course.controller';
import { CourseValidation } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/', CourseControllers.getAllCourses);

router.get('/:id', CourseControllers.getSingleCourse);

router.patch(
  '/:id',
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);
router.put(
  '/:courseId/assign-faculty',
  validateRequest(CourseValidation.courseFacultiesValidationSchema),
  CourseControllers.assignFaculties,
);
router.delete(
  '/:courseId/remove-faculty',
  validateRequest(CourseValidation.courseFacultiesValidationSchema),
  CourseControllers.removeFaculties,
);

router.delete('/:id', CourseControllers.deleteCourse);
export const CourseRoutes = router;
