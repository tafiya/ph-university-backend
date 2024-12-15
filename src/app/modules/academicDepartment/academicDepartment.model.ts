import { StatusCodes } from 'http-status-codes';
import { model, Schema } from 'mongoose';
import AppError from '../../errors/AppError';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentScheme = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

// check duplicate department name
academicDepartmentScheme.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Department is already exist..');
  }
  next();
});

//update dept. id checking..
academicDepartmentScheme.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartment.findOne(query);
  if (!isDepartmentExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Department is not exists');
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentScheme,
);
