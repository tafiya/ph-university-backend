import express from 'express';
import { studentControllers } from './student.controller';

const route = express.Router();

// will call a controller function
route.post('/create-student', studentControllers.createStudent);

// will call a controller to fetch all student data
route.get('/', studentControllers.getAllStudent);
// will call a controller to fetch a single student data
route.get('/:studentID', studentControllers.getStudent);
route.delete('/:studentID', studentControllers.deleteStudent);
route.put('/:studentID', studentControllers.updateStudent);

export const studentsRoutes = route;
