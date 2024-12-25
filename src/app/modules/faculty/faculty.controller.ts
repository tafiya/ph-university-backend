import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { facultyServices } from './faculty.service';

const getAllFaculty = catchAsync(async (req, res, next) => {
  const result = await facultyServices.getALLFacultyFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Faculties are retrieved successfully',
    data: result,
  });
});
// get a single data
const getFaculty = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await facultyServices.getFacultyFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Single Faculty is retrieved successfully',
    data: result,
  });
});
const deleteFaculty = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await facultyServices.deleteFacultyFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Single Faculty is deleted successfully',
    data: result,
  });
});
const updateFaculty = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await facultyServices.updateFacultyIntoDB(id, faculty);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Single Faculty is updated successfully',
    data: result,
  });
});

export const facultyControllers = {
  getAllFaculty,
  getFaculty,
  deleteFaculty,
  updateFaculty,
};
