"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    password: zod_1.z
        .string({ invalid_type_error: 'Name must be a string' })
        .max(20, { message: 'Password can not more than 20 characters' })
        .optional(),
});
exports.UserValidation = {
    userValidationSchema,
};
