import { TStudent } from './student.interface';
import { Student } from './student.model';

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
  getALLStudentFromDB,
  getStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDB,
};
