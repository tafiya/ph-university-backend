import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { AcademicSemesterValidations } from './academicSemester.validate';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createStudent,
);

router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);

// will call a controller to fetch a single Academic Semester data
router.get('/:academicID', AcademicSemesterControllers.getAcademicSemester);

router.patch(
  '/:academicID',
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
