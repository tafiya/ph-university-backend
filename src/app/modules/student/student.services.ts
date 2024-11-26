import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDb = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};
// get all student data
const getALLStudentFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};
// get a single data
const getStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const studentServices = {
  createStudentIntoDb,
  getALLStudentFromDB,
  getStudentFromDB,
};
