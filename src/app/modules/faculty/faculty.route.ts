import express from 'express';
import { facultyControllers } from './faculty.controller';

const router = express.Router();

router.get('/', facultyControllers.getAllFaculty);
router.get('/:facultyID', facultyControllers.getFaculty);
router.delete('/:facultyID', facultyControllers.deleteFaculty);
router.patch('/:facultyID', facultyControllers.updateFaculty);

export const facultyRoutes = router;
