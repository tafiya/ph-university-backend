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
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const admin_constant_1 = require("./admin.constant");
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required from model'],
        trim: true,
        maxlength: [20, 'First name should not be more than 20 character'],
    },
    middleName: { type: String, trim: true },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last name is required from model'],
    },
});
const AdminSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'ID is required'],
        unique: true,
        trim: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'UserId is required'],
        unique: true,
        ref: 'User',
    },
    designation: {
        type: String,
        required: [true, 'Designation is required'],
        trim: true,
    },
    name: userNameSchema,
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        trim: true,
    },
    gender: {
        type: String,
        enum: {
            values: admin_constant_1.gender,
            message: '{values} is not supported',
        },
        required: [true, 'Gender is required'],
        trim: true,
    },
    dateOfBirth: { type: Date, trim: true },
    contactNo: {
        type: String,
        required: [true, 'Contact No is required'],
        trim: true,
    },
    emergencyContactNo: {
        type: String,
        required: [true, 'Emergency Contact No Address is required'],
        trim: true,
    },
    bloodGroup: {
        type: String,
        enum: {
            values: admin_constant_1.bloodGroup,
            message: '{values is not supported}',
        },
    },
    presentAddress: {
        type: String,
        required: [true, 'Present Address is required'],
        trim: true,
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent Address is required'],
        trim: true,
    },
    profileImg: {
        type: String,
        required: [true, 'ProfileImg is required'],
    },
    isDeleted: { type: Boolean, default: false },
}, {
    toJSON: {
        virtuals: true,
    },
});
//creating Virtual-------------------
AdminSchema.virtual('fullName').get(function () {
    var _a, _b, _c;
    // return this.name.firstName + this.name.middleName + this.name.lastName;
    return `${(_a = this === null || this === void 0 ? void 0 : this.name) === null || _a === void 0 ? void 0 : _a.firstName} ${(_b = this === null || this === void 0 ? void 0 : this.name) === null || _b === void 0 ? void 0 : _b.middleName} ${(_c = this === null || this === void 0 ? void 0 : this.name) === null || _c === void 0 ? void 0 : _c.lastName}`;
});
// middle ware for delate
// this middleware is used to hide the deleted data from showing main data
AdminSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
// this middleware is used to hide the deleted data from searching individual
AdminSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
// aggregate middleware
AdminSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
// check existing user using static methods
AdminSchema.statics.isUserExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.Admin.findOne({ id });
        return existingUser;
    });
};
exports.Admin = (0, mongoose_1.model)('Admin', AdminSchema);
