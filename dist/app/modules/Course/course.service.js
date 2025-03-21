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
exports.CourseServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const course_constant_1 = require("./course.constant");
const course_model_1 = require("./course.model");
const createCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const result = yield course_model_1.Course.create(payload);
    return result;
});
const getALLCoursesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(course_model_1.Course.find().populate('preRequisiteCourses.course'), query)
        .search(course_constant_1.CourseSearchableFelids)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield courseQuery.modelQuery;
    return result;
});
const getCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findById(id).populate('preRequisiteCourses.course');
    return result;
});
const updateCourseFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { preRequisiteCourses } = payload, remainingCourseData = __rest(payload, ["preRequisiteCourses"]);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const updateBasicCourseInfo = yield course_model_1.Course.findByIdAndUpdate(id, remainingCourseData, {
            new: true,
            runValidators: true,
            session,
        });
        if (!updateBasicCourseInfo) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to update data');
        }
        // check if thee is any pre requisite course to update
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            const deletedPreRequisites = preRequisiteCourses
                .filter((el) => el.course && el.isDeleted)
                .map((el) => el.course);
            const deletedPreRequisiteCourses = yield course_model_1.Course.findByIdAndUpdate(id, {
                $pull: {
                    preRequisiteCourses: {
                        course: {
                            $in: deletedPreRequisites,
                        },
                    },
                },
            }, {
                new: true,
                runValidators: true,
                session,
            });
            if (!deletedPreRequisiteCourses) {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to update data');
            }
            const newPreRequisite = preRequisiteCourses.filter((el) => el.course && !el.isDeleted);
            const newPreRequisiteCourses = yield course_model_1.Course.findByIdAndUpdate(id, {
                $addToSet: {
                    preRequisiteCourses: {
                        $each: newPreRequisite,
                    },
                },
            }, {
                new: true,
                runValidators: true,
                session,
            });
            if (!newPreRequisiteCourses) {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to update data');
            }
        }
        const result = yield course_model_1.Course.findById(id).populate('preRequisiteCourses.course');
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to update data');
    }
});
const deleteCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
const assignFacultiesWithCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseFaculty.findByIdAndUpdate(id, {
        course: id,
        $addToSet: { faculties: { $each: payload } },
    }, {
        upsert: true,
        new: true,
    });
    return result;
});
const removeFacultiesWithCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseFaculty.findByIdAndUpdate(id, {
        $pull: { faculties: { $in: payload } },
    }, {
        new: true,
    });
    return result;
});
exports.CourseServices = {
    createCourseIntoDB,
    getALLCoursesFromDB,
    getCourseFromDB,
    deleteCourseFromDB,
    updateCourseFromDB,
    assignFacultiesWithCourseIntoDB,
    removeFacultiesWithCourseIntoDB,
};
