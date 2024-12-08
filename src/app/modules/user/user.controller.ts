import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;
    // // data validation using Zod
    // const zodParseData = studentValidationSchema.parse(studentData);

    const result = await UserServices.createStudentIntoDb(
      password,
      studentData,
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Booking created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createStudent,
};
