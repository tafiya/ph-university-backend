import { StatusCodes } from 'http-status-codes';
import { model, Schema } from 'mongoose';
import AppError from '../../errors/AppError';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: AcademicSemesterName,
    required: true,
  },
  code: {
    type: String,
    enum: AcademicSemesterCode,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  startMonth: {
    type: String,
    enum: Months,
    required: true,
  },
  endMonth: {
    type: String,
    enum: Months,
    required: true,
  },
});

// prevent to save same name semester in a same year
academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Semester is already exits..');
  }
  next();
});

academicSemesterSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isSemesterExists = await AcademicSemester.findOne(query);
  if (!isSemesterExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Semester is not Exist');
  }
  next();
});
export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
