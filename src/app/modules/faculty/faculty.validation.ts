import { z } from 'zod';
const createUserNameValidationSchema = z.object({
  firstName: z.string().max(20, 'First name should not exceed 20 characters'),
  middleName: z.string().optional(),
  lastName: z.string(),
});
const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    faculty: z.object({
      designation: z.string(),
      name: createUserNameValidationSchema,
      email: z.string().email(),
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      academicDepartment: z.string(),
      profileImg: z.string(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
export const FacultyValidation = {
  createFacultyValidationSchema,
};
