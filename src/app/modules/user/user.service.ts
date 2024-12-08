import config from '../../config/index';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDb = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);

  // set the role
  userData.role = 'Student';

  // set manually generated id
  userData.id = '203020001';

  const newUser = await User.create(userData); //build in static method

  // create a student
  if (Object.keys(newUser).length) {
    // set id ,_id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};
export const UserServices = {
  createStudentIntoDb,
};
