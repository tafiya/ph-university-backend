import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import config from '../../index';
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
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'First name should not be more than 20 character'],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNamestr =
    //       value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    //     return firstNamestr === value;
    //   },
    //   message: '{VALUE} is not capitalize',
    // },
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // },
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
    password: {
      type: String,
      trim: true,
      required: [true, 'Id  is required'],
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
        message: '{values} is no supported',
      },
    },
    dateOfBirth: { type: String, trim: true },
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
    isActive: {
      type: String,
      trim: true,
      enum: {
        values: ['active', 'isActive'],
        message: '{values is not supported}',
      },
      default: 'active',
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
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// pre middleware function
// using to hide the original password
studentSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salts_round),
  );
  next();
});

//  hide to save the password
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
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
// aggregate middleware
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// check existing user using static methods
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// check for existing user
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };
// create student model

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
