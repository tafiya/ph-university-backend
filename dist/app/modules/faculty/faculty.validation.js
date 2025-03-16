"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyValidation = void 0;
const zod_1 = require("zod");
const createUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().max(20, 'First name should not exceed 20 characters'),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z.string(),
});
const createFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20),
        faculty: zod_1.z.object({
            designation: zod_1.z.string(),
            name: createUserNameValidationSchema,
            email: zod_1.z.string().email(),
            gender: zod_1.z.enum(['male', 'female', 'other']),
            dateOfBirth: zod_1.z.string().optional(),
            contactNo: zod_1.z.string(),
            emergencyContactNo: zod_1.z.string(),
            bloodGroup: zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            presentAddress: zod_1.z.string(),
            permanentAddress: zod_1.z.string(),
            academicDepartment: zod_1.z.string(),
            profileImg: zod_1.z.string(),
            isDeleted: zod_1.z.boolean().optional(),
        }),
    }),
});
exports.FacultyValidation = {
    createFacultyValidationSchema,
};
