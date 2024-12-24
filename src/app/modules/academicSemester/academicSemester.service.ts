import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { academicSemesterCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterCodeMapper[payload.name] !== payload.code) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Invalid Semester code');
  }
  // call the academic model
  const result = await AcademicSemester.create(payload);
  return result;
};
// get all student data
const getALLAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};
// get a single data
const getAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};
const updateAcademicSemesterFromDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Invalid Semester Code');
  }
  const result = await AcademicSemester.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};
export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getALLAcademicSemesterFromDB,
  getAcademicSemesterFromDB,
  updateAcademicSemesterFromDB,
};
