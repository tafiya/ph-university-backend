import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentServices } from './academicdepartment.service';

const createAcademicDepartment = catchAsync(async (req, res, next) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Academic Department created successfully',
    data: result,
  });
});
const getAllAcademicDepartments = catchAsync(async (req, res, next) => {
  const result =
    await AcademicDepartmentServices.getALLAcademicDepartmentsFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Academic Departments are retrieved successfully',
    data: result,
  });
});
// get a single Academic Department
const getAcademicDepartment = catchAsync(async (req, res, next) => {
  const { departmentID } = req.params;
  const result =
    await AcademicDepartmentServices.getAcademicDepartmentFromDB(departmentID);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Academic Department is retrieved successfully',
    data: result,
  });
});
const updateAcademicDepartment = catchAsync(async (req, res, next) => {
  const { departmentID } = req.params;
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentFromDB(
      departmentID,
      req.body,
    );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Academic Department is updated successfully',
    data: result,
  });
});
export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicFaculties: getAllAcademicDepartments,
  getAcademicDepartment,
  updateAcademicDepartment,
};
