import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createStudent,
);

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);

// will call a controller to fetch a single Academic Faculty data
router.get('/:facultyID', AcademicFacultyControllers.getAcademicFaculty);

router.patch(
  '/:facultyID',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
