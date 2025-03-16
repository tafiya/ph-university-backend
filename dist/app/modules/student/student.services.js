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
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentServices = void 0;
const student_model_1 = require("./student.model");
const createStudentIntoDb = (studentData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield student_model_1.Student.isUserExists(studentData.id)) {
        throw new Error('User is already exists..');
    }
    const result = yield student_model_1.Student.create(studentData); //build in static method
    // const student = new Student(studentData); //create an instance
    // if (await student.isUserExists(studentData.id)) {
    //   throw new Error('User is already Exists');
    // }
    // const result = await student.save(); //build in instant method
    return result;
});
// get all student data
const getALLStudentFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.find();
    return result;
});
// get a single data
const getStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findOne({ id });
    return result;
});
// delete a student
const deleteStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, 'got the id');
    const result = yield student_model_1.Student.updateOne({ id }, { isDeleted: true });
    return result;
});
const updateStudentFromDB = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.studentServices = {
    createStudentIntoDb,
    getALLStudentFromDB,
    getStudentFromDB,
    deleteStudentFromDB,
    updateStudentFromDB,
};
