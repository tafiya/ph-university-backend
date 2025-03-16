"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentValidation = void 0;
const zod_1 = require("zod");
const createAcademicDepartmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: 'Academic Department be a string',
            required_error: 'Department is required',
        }),
        academicFaculty: zod_1.z
            .string({
            invalid_type_error: 'Academic Department be a string',
            required_error: 'Department is required',
        })
            .optional(),
    }),
});
const updateAcademicDepartmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: 'Academic Department be a string',
            required_error: 'Department is required',
        }),
        academicFaculty: zod_1.z
            .string({
            invalid_type_error: 'Academic Department be a string',
            required_error: 'Department is required',
        })
            .optional(),
    }),
});
exports.AcademicDepartmentValidation = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema,
};
