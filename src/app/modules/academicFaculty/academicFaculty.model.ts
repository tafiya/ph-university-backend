import { StatusCodes } from 'http-status-codes';
import { model, Schema } from 'mongoose';
import AppError from '../../errors/AppError';
import { TAcademicFaculty } from './acdemicFaculty.interface';

const academicFacultyScheme = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

academicFacultyScheme.pre('save', async function (next) {
  const isDepartmentExist = await AcademicFaculty.findOne({
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Faculty is already Exists');
  }
  next();
});

academicFacultyScheme.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicFaculty.findOne(query);
  if (!isDepartmentExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Faculty is not Exist...');
  }
  next();
});
export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultyScheme,
);
