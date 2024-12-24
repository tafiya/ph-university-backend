import { model, Schema } from 'mongoose';
import { bloodGroup, gender } from './admin.constant';
import { AdminModel, TAdmin, TUsername } from './admin.interface';

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

const AdminSchema = new Schema<TAdmin, AdminModel>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'UserId is required'],
      unique: true,
      ref: 'User',
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
      trim: true,
    },
    name: userNameSchema,
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: {
        values: gender,
        message: '{values} is not supported',
      },
      required: [true, 'Gender is required'],
      trim: true,
    },
    dateOfBirth: { type: Date, trim: true },
    contactNo: {
      type: String,
      required: [true, 'Contact No is required'],
      trim: true,
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact No Address is required'],
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: {
        values: bloodGroup,
        message: '{values is not supported}',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address is required'],
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address is required'],
      trim: true,
    },
    profileImg: {
      type: String,
      required: [true, 'ProfileImg is required'],
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);
//creating Virtual-------------------

AdminSchema.virtual('fullName').get(function () {
  // return this.name.firstName + this.name.middleName + this.name.lastName;
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});
// middle ware for delate
// this middleware is used to hide the deleted data from showing main data
AdminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
// this middleware is used to hide the deleted data from searching individual
AdminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
// aggregate middleware
AdminSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// check existing user using static methods
AdminSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Admin.findOne({ id });
  return existingUser;
};

export const Admin = model<TAdmin, AdminModel>('Admin', AdminSchema);
