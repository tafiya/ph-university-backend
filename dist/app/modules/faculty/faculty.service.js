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
exports.facultyServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const faculty_constant_1 = require("./faculty.constant");
const faculty_model_1 = require("./faculty.model");
// get all student data
const getALLFacultyFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const facultyQuery = new QueryBuilder_1.default(faculty_model_1.Faculty.find().populate({
        path: 'academicDepartment',
        populate: { path: 'academicFaculty' },
    }), query)
        .search(faculty_constant_1.FacultySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield facultyQuery.modelQuery;
    return result;
});
// get a single data
const getFacultyFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.Faculty.findById(id).populate({
        path: 'academicDepartment',
        populate: { path: 'academicFaculty' },
    });
    if (result == null) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Faculty is not exist');
    }
    return result;
});
// update a student
const updateFacultyIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isStudentExist = yield faculty_model_1.Faculty.findById(id);
    if (isStudentExist === null) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Student Id is not exist');
    }
    const { name } = payload, remainingFacultyData = __rest(payload, ["name"]);
    const modifiedUpdatedData = Object.assign({}, remainingFacultyData);
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }
    const result = yield faculty_model_1.Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
    return result;
});
// delete a faculty
const deleteFacultyFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isFacultyExist = yield faculty_model_1.Faculty.findById(id);
    if (isFacultyExist === null) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Faculty Id is not exist');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedFaculty = yield faculty_model_1.Faculty.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session });
        if (!deletedFaculty) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to delete Faculty');
        }
        // get user _id from deleted faculty
        const userId = deletedFaculty.user;
        const deletedUser = yield user_model_1.User.findOneAndUpdate(userId, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to delete User');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deletedFaculty;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error('Failed to delete');
    }
});
exports.facultyServices = {
    getALLFacultyFromDB,
    getFacultyFromDB,
    updateFacultyIntoDB,
    deleteFacultyFromDB,
};
