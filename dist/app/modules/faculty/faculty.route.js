"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const user_constant_1 = require("../user/user.constant");
const faculty_controller_1 = require("./faculty.controller");
const router = express_1.default.Router();
router.get('/', (0, auth_1.auth)(user_constant_1.USER_ROLE.Admin, user_constant_1.USER_ROLE.Faculty), faculty_controller_1.facultyControllers.getAllFaculty);
router.get('/:id', faculty_controller_1.facultyControllers.getFaculty);
router.delete('/:id', faculty_controller_1.facultyControllers.deleteFaculty);
router.patch('/:id', faculty_controller_1.facultyControllers.updateFaculty);
exports.facultyRoutes = router;
