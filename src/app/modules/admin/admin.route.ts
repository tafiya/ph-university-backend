import express from 'express';
import { adminControllers } from './admin.controller';

const router = express.Router();

router.get('/', adminControllers.getAllAdmin);
router.get('/:adminID', adminControllers.getAdmin);
router.delete('/:adminID', adminControllers.deleteAdmin);
router.patch('/:adminID', adminControllers.updateAdmin);

export const adminRoutes = router;
