"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const academicDepartment_route_1 = require("../modules/academicDepartment/academicDepartment.route");
const academicFaculty_route_1 = require("../modules/academicFaculty/academicFaculty.route");
const academicSemester_route_1 = require("../modules/academicSemester/academicSemester.route");
const admin_route_1 = require("../modules/admin/admin.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const course_route_1 = require("../modules/Course/course.route");
const faculty_route_1 = require("../modules/faculty/faculty.route");
const offeredCourse_route_1 = require("../modules/offeredCourse/offeredCourse.route");
const semesterRegistration_route_1 = require("../modules/semesterRegistration/semesterRegistration.route");
const student_route_1 = require("../modules/student/student.route");
const user_route_1 = require("../modules/user/user.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/students',
        route: student_route_1.studentsRoutes,
    },
    {
        path: '/users',
        route: user_route_1.userRoutes,
    },
    {
        path: '/admins',
        route: admin_route_1.adminRoutes,
    },
    {
        path: '/faculties',
        route: faculty_route_1.facultyRoutes,
    },
    {
        path: '/academic-semesters',
        route: academicSemester_route_1.AcademicSemesterRoutes,
    },
    {
        path: '/academic-faculties',
        route: academicFaculty_route_1.AcademicFacultyRoutes,
    },
    {
        path: '/academic-departments',
        route: academicDepartment_route_1.AcademicDepartmentRoutes,
    },
    {
        path: '/course',
        route: course_route_1.CourseRoutes,
    },
    {
        path: '/semester-registrations',
        route: semesterRegistration_route_1.semesterRegistrationRoutes,
    },
    {
        path: '/offered-courses',
        route: offeredCourse_route_1.offeredCourseRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
