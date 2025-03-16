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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./../user/user.model");
const student_constant_1 = require("./student.constant");
const student_model_1 = require("./student.model");
// get all student data
const getALLStudentFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // const queryObj = { ...query };
    // const studentSearchableField = ['email', 'name.firstName', 'presentAddress'];
    // let searchTerm = '';
    // if (query?.searchTerm) {
    //   searchTerm = query?.searchTerm as string;
    // }
    // const searchQuery = Student.find({
    //   $or: studentSearchableField.map((field) => ({
    //     [field]: { $regex: searchTerm, $options: 'i' },
    //   })),
    // });
    // // filtering
    // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    // excludeFields.forEach((el) => delete queryObj[el]);
    // console.log({ query }, { queryObj });
    // const filteringQuery = searchQuery
    //   .find(queryObj)
    //   .populate('admissionSemester')
    //   .populate({
    //     path: 'academicDepartment',
    //     populate: { path: 'academicFaculty' },
    //   });
    // // sorting
    // let sort = '-createdAt';
    // if (query.sort) {
    //   sort = query.sort as string;
    // }
    // const sortQuery = filteringQuery.sort(sort);
    // // limiting
    // let limit = 1;
    // let page = 1;
    // let skip = 0;
    // if (query.limit) {
    //   limit = Number(query.limit);
    // }
    // if (query.page) {
    //   page = Number(query.page);
    //   skip = (page - 1) * limit;
    // }
    // const paginationQuery = sortQuery.skip(skip);
    // const limitQuery = paginationQuery.limit(limit);
    // let fields = '-_v';
    // if (query.fields) {
    //   fields = (query.fields as string).split(',').join(' ');
    //   console.log(fields);
    // }
    // const fieldQuery = await limitQuery.select(fields);
    // return fieldQuery;
    const studentQuery = new QueryBuilder_1.default(student_model_1.Student.find()
        .populate('user')
        .populate('admissionSemester')
        .populate({
        path: 'academicDepartment',
        populate: { path: 'academicFaculty' },
    }), query)
        .search(student_constant_1.studentSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield studentQuery.modelQuery;
    return result;
});
// get a single data
const getStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findById(id)
        .populate('admissionSemester')
        .populate({
        path: 'academicDepartment',
        populate: { path: 'academicFaculty' },
    });
    if (result == null) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Student Id is not exist');
    }
    return result;
});
// update a student
const updateStudentIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isStudentExist = yield student_model_1.Student.findById(id);
    if (isStudentExist === null) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Student Id is not exist');
    }
    const { name, guardian, localGuardian } = payload, remainingStudentData = __rest(payload, ["name", "guardian", "localGuardian"]);
    const modifiedUpdatedData = Object.assign({}, remainingStudentData);
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }
    const result = yield student_model_1.Student.findByIdAndUpdate(id, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
    return result;
});
// delete a student
const deleteStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isStudentExist = yield student_model_1.Student.findById(id);
    if (isStudentExist === null) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Student Id is not exist');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedStudent = yield student_model_1.Student.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session });
        if (!deletedStudent) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to delete Student');
        }
        // get the deleted user id
        const userId = deletedStudent.user;
        const deletedUser = yield user_model_1.User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to delete User');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deletedStudent;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error('Failed to delete');
    }
});
exports.studentServices = {
    getALLStudentFromDB,
    getStudentFromDB,
    deleteStudentFromDB,
    updateStudentFromDB: updateStudentIntoDB,
};
