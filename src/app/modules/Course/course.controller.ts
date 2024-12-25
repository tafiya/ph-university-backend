import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res, next) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Course created successfully',
    data: result,
  });
});
const getAllCourses = catchAsync(async (req, res, next) => {
  const result = await CourseServices.getALLCoursesFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Courses are retrieved successfully',
    data: result,
  });
});
// get a single Course
const getSingleCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await CourseServices.getCourseFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Course is retrieved successfully',
    data: result,
  });
});
const deleteCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Course is deleted successfully',
    data: result,
  });
});
const assignFaculties = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.assignFacultiesWithCourseIntoDB(
    courseId,
    faculties,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Faculty is assign successfully',
    data: result,
  });
});
const removeFaculties = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.removeFacultiesWithCourseIntoDB(
    courseId,
    faculties,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Faculty removed  successfully',
    data: result,
  });
});
const updateCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseFromDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Course is updated successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  assignFaculties,
  removeFaculties,
};
