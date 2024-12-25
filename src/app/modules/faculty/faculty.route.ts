import express from 'express';
import { facultyControllers } from './faculty.controller';

const router = express.Router();

router.get('/', facultyControllers.getAllFaculty);
router.get('/:id', facultyControllers.getFaculty);
router.delete('/:id', facultyControllers.deleteFaculty);
router.patch('/:id', facultyControllers.updateFaculty);

export const facultyRoutes = router;
