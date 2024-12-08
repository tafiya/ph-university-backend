"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = require("./app/middleware/globalErrorHandler");
const student_route_1 = require("./app/modules/student/student.route");
const user_route_1 = require("./app/modules/user/user.route");
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes
app.use('/api/v1/students', student_route_1.studentsRoutes);
app.use('/api/v1/users', user_route_1.userRoutes);
const getAController = (req, res) => {
    res.json({
        message: 'get the data',
    });
};
app.get('/', getAController);
// set global error
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
