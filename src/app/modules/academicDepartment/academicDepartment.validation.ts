import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department be a string',
      required_error: 'Department is required',
    }),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic Department be a string',
        required_error: 'Department is required',
      })
      .optional(),
  }),
});
const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department be a string',
      required_error: 'Department is required',
    }),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic Department be a string',
        required_error: 'Department is required',
      })
      .optional(),
  }),
});
export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
