import { Model, Types } from 'mongoose';

export type TUsername = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TUsername;
  email: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: Date;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  academicDepartment: Types.ObjectId;
  profileImg?: string;
  isDeleted: boolean;
};

export interface FacultyModel extends Model<TFaculty> {
  isUserExist(id: string): Promise<TFaculty | null>;
}
