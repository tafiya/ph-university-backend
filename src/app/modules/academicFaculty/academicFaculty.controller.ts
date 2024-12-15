import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res, next) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Academic Faculty created successfully',
    data: result,
  });
});
const getAllAcademicFaculties = catchAsync(async (req, res, next) => {
  const result = await AcademicFacultyServices.getALLAcademicFacultiesFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Academic Facultys are retrieved successfully',
    data: result,
  });
});
// get a single Academic Faculty
const getAcademicFaculty = catchAsync(async (req, res, next) => {
  const { facultyID } = req.params;
  const result =
    await AcademicFacultyServices.getAcademicFacultyFromDB(facultyID);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Academic Faculty is retrieved successfully',
    data: result,
  });
});
const updateAcademicFaculty = catchAsync(async (req, res, next) => {
  const { facultyID } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFacultyFromDB(
    facultyID,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Academic Faculty is updated successfully',
    data: result,
  });
});
export const AcademicFacultyControllers = {
  createStudent: createAcademicFaculty,
  getAllAcademicFaculties,
  getAcademicFaculty,
  updateAcademicFaculty,
};
