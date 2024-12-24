import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;
  // // data validation using Zod
  // const zodParseData = studentValidationSchema.parse(studentData);

  const result = await UserServices.createStudentIntoDb(password, studentData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Student is created successfully',
    data: result,
  });
});
const createFaculty = catchAsync(async (req, res, next) => {
  const { password, faculty: facultyData } = req.body;
  const result = await UserServices.createFacultyIntoDb(password, facultyData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'faculty is created successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res, next) => {
  const { password, admin: AdminData } = req.body;
  const result = await UserServices.createAdminIntoDb(password, AdminData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Admin is created successfully',
    data: result,
  });
});
export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
