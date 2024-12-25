import express from 'express';
import { adminControllers } from './admin.controller';

const router = express.Router();

router.get('/', adminControllers.getAllAdmin);
router.get('/:id', adminControllers.getAdmin);
router.delete('/:id', adminControllers.deleteAdmin);
router.patch('/:id', adminControllers.updateAdmin);

export const adminRoutes = router;
