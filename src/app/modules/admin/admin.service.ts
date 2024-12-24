import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { adminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';

// get all student data
const getALLAdminFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(adminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await adminQuery.modelQuery;
  return result;
};
// get a single data
const getAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);
  if (result == null) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'AdminId is not exist');
  }
  return result;
};
// update a student
const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const isAdminExist = await Admin.findById(id);
  if (isAdminExist === null) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'AdminId is not exist');
  }
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  const result = await Admin.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};
// delete a student
const deleteAdminFromDB = async (id: string) => {
  const isAdminExist = await Admin.findById(id);
  if (isAdminExist === null) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Admin Id is not exist');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedAdmin) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete Admin');
    }
    // get the deleted user id
    const userId = deletedAdmin.user;
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete User');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedAdmin;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete');
  }
};
export const adminServices = {
  getALLAdminFromDB,
  getAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
