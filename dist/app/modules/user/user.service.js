"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("../../config/index"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const academicDepartment_model_1 = require("../academicDepartment/academicDepartment.model");
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const admin_model_1 = require("../admin/admin.model");
const faculty_model_1 = require("../faculty/faculty.model");
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const createStudentIntoDb = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    userData.password = password || index_1.default.default_password;
    // set the role
    userData.role = 'Student';
    // find academic semester
    const admissionSemester = yield academicSemester_model_1.AcademicSemester.findById(payload.admissionSemester);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        if (!admissionSemester) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Semester Id not found');
        }
        userData.id = yield (0, user_utils_1.generatedStudentId)(admissionSemester);
        // create a user (transaction-1)
        const newUser = yield user_model_1.User.create([userData], { session }); //user array
        // create a student
        if (!newUser.length) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to create new User');
        }
        // set id ,_id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;
        // create a student (transaction-2)
        const newStudent = yield student_model_1.Student.create([payload], { session });
        if (!newStudent.length) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to create new Student');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newStudent;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error('Failed to create new Student');
    }
});
// create faculty
const createFacultyIntoDb = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    userData.password = password || index_1.default.default_password;
    // set the role
    userData.role = 'Faculty';
    // find academic semester
    const academicDepartment = yield academicDepartment_model_1.AcademicDepartment.findById(payload.academicDepartment);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        if (!academicDepartment) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Department is  not found');
        }
        userData.id = yield (0, user_utils_1.generatedFacultyId)();
        // create a user (transaction-1)
        const newUser = yield user_model_1.User.create([userData], { session }); //user array
        // create a student
        if (!newUser.length) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to to create new User');
        }
        // set id ,_id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;
        // create a student (transaction-2)
        const newFaculty = yield faculty_model_1.Faculty.create([payload], { session });
        if (!newFaculty.length) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to create  new Faculty');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newFaculty;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error('Failed to create to new Faculty');
    }
});
const createAdminIntoDb = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    userData.password = password || index_1.default.default_password;
    // set the role
    userData.role = 'Admin';
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        userData.id = yield (0, user_utils_1.generatedAdminId)();
        // create a user (transaction-1)
        const newUser = yield user_model_1.User.create([userData], { session }); //user array
        // create a student
        if (!newUser.length) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to to create new User');
        }
        // set id ,_id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;
        // create a student (transaction-2)
        const newAdmin = yield admin_model_1.Admin.create([payload], { session });
        if (!newAdmin.length) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to create new Admin');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newAdmin;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error('Failed to create to new Admin');
    }
});
exports.UserServices = {
    createStudentIntoDb,
    createFacultyIntoDb,
    createAdminIntoDb,
};
