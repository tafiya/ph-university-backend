import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import { studentServices } from './student.service';

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentServices.getALLStudentFromDB();
    // console.log(result);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'students are retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
// get a single data
const getStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentID } = req.params;
    // another way
    // const data=req.params.studentID
    const result = await studentServices.getStudentFromDB(studentID);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Single student is retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentID } = req.params;
    // another way
    // const data=req.params.studentID
    const result = await studentServices.deleteStudentFromDB(studentID);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Single student is deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentID } = req.params;
    const updateData = req.body;
    // another way
    // const data=req.params.studentID
    const result = await studentServices.updateStudentFromDB(
      studentID,
      updateData,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Single student is updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const studentControllers = {
  getAllStudent,
  getStudent,
  deleteStudent,
  updateStudent,
};
