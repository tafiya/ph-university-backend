import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Academic Semester created successfully',
    data: result,
  });
});
const getAllAcademicSemesters = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterServices.getALLAcademicSemesterFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Academic Semesters are retrieved successfully',
    data: result,
  });
});
// get a single Academic Semester
const getAcademicSemester = catchAsync(async (req, res, next) => {
  const { academicID } = req.params;
  const result =
    await AcademicSemesterServices.getAcademicSemesterFromDB(academicID);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Academic Semester is retrieved successfully',
    data: result,
  });
});
const updateAcademicSemester = catchAsync(async (req, res, next) => {
  const { academicID } = req.params;
  const result = await AcademicSemesterServices.updateAcademicSemesterFromDB(
    academicID,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Academic Semester is updated successfully',
    data: result,
  });
});
export const AcademicSemesterControllers = {
  createStudent: createAcademicSemester,
  getAllAcademicSemesters,
  getAcademicSemester,
  updateAcademicSemester,
};
