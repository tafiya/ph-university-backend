import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDb = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User is already exists..');
  }
  const result = await Student.create(studentData); //build in static method

  // const student = new Student(studentData); //create an instance
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User is already Exists');
  // }

  // const result = await student.save(); //build in instant method
  return result;
};
// get all student data
const getALLStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};
// get a single data
const getStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};
// delete a student
const deleteStudentFromDB = async (id: string) => {
  console.log(id, 'got the id');
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};
const updateStudentFromDB = async (
  id: string,
  updateData: Partial<TStudent>,
) => {
  const result = await Student.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const studentServices = {
  createStudentIntoDb,
  getALLStudentFromDB,
  getStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDB,
};
