import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { FacultySearchableFields } from './faculty.constant';
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';

// get all student data
const getALLFacultyFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    }),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await facultyQuery.modelQuery;
  return result;
};
// get a single data
const getFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id).populate({
    path: 'academicDepartment',
    populate: { path: 'academicFaculty' },
  });
  if (result == null) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Faculty is not exist');
  }
  return result;
};
// update a student
const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const isStudentExist = await Faculty.findById(id);
  if (isStudentExist === null) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Student Id is not exist');
  }
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};
// delete a faculty
const deleteFacultyFromDB = async (id: string) => {
  const isFacultyExist = await Faculty.findById(id);
  if (isFacultyExist === null) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Faculty Id is not exist');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedFaculty) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete Faculty');
    }
    // get user _id from deleted faculty
    const userId = deletedFaculty.user;
    const deletedUser = await User.findOneAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete User');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedFaculty;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete');
  }
};
export const facultyServices = {
  getALLFacultyFromDB,
  getFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB,
};
