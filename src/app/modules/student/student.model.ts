import { model, Schema } from 'mongoose';

import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUsername,
} from './student.interface';

const userNameSchema = new Schema<TUsername>({
  firstName: {
    type: String,
    required: [true, 'First name is required from model'],
    trim: true,
    maxlength: [20, 'First name should not be more than 20 character'],
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required from model'],
  },
});
const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'FatherName is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Occupation is required'],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, 'father Contact No is required'],
  },
  motherName: { type: String, required: [true, 'Mother name is required'] },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Mother Occupation is required'],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Mother Contact no is required'],
  },
});
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Local Guardian Name is required'],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, 'Local Guardian Occupation is required'],
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'Local Guardian Contact No is required'],
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'Local Guardian Address is required'],
  },
});
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      trim: true,
      required: [true, 'Id  is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'userId  is required'],
      unique: true,
      ref: 'User',
    },

    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    email: { type: String, trim: true, required: true, unique: true },
    gender: {
      type: String,
      trim: true,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{values} is not supported',
      },
    },
    dateOfBirth: { type: Date, trim: true },
    contactNo: {
      type: String,
      trim: true,
      required: [true, 'Contact is required'],
    },
    emergencyContactNo: {
      type: String,
      trim: true,
      required: [true, ' Emergency Contact is required'],
    },
    bloodGroup: {
      type: String,
      trim: true,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{values is not supported}',
      },
    },
    presentAddress: {
      type: String,
      trim: true,
      required: [true, 'Present Address is required'],
    },
    permanentAddress: {
      type: String,
      trim: true,
      required: [true, 'Permanent Address is required'],
    },
    guardian: {
      type: guardianSchema,
      trim: true,
      required: [true, 'Guardian is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      trim: true,
      required: [true, 'Local Guardian is required'],
    },
    profileImg: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//creating Virtual-------------------

studentSchema.virtual('fullName').get(function () {
  // return this.name.firstName + this.name.middleName + this.name.lastName;
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// middle ware for delate
// this middleware is used to hide the deleted data from showing main data
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
// this middleware is used to hide the deleted data from searching individual
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOneAndUpdate', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
// aggregate middleware
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// delete student
// studentSchema.pre('findOneAndUpdate', async function (next) {
//   const query = this.getQuery();
//   console.log(query);
//   const isStudentExist = await Student.findOne(query);
//   console.log(isStudentExist);
//   if (!isStudentExist) {
//     console.log('call the error');
//     throw new AppError(StatusCodes.NOT_FOUND, 'Student is not exists');
//   }
//   next();
// });
// check existing user using static methods
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
