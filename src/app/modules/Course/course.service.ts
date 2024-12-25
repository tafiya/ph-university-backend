import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { CourseSearchableFelids } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  console.log(payload);
  const result = await Course.create(payload);
  return result;
};

const getALLCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFelids)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};
const updateCourseFromDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...remainingCourseData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      remainingCourseData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );
    if (!updateBasicCourseInfo) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update data');
    }
    // check if thee is any pre requisite course to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPreRequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: {
              course: {
                $in: deletedPreRequisites,
              },
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!deletedPreRequisiteCourses) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update data');
      }
      const newPreRequisite = preRequisiteCourses.filter(
        (el) => el.course && !el.isDeleted,
      );

      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourses: {
              $each: newPreRequisite,
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!newPreRequisiteCourses) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update data');
      }
    }
    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update data');
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};
const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};
const removeFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getALLCoursesFromDB,
  getCourseFromDB,
  deleteCourseFromDB,
  updateCourseFromDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesWithCourseIntoDB,
};
