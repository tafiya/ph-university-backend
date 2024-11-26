import { Request, Response } from 'express';
import { studentServices } from './student.services';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // will call service func to send data
    const result = await studentServices.createStudentIntoDb(studentData);
    // send response
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getALLStudentFromDB();
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'students are retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
// get a single data
const getStudent = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    // another way
    // const data=req.params.studentID
    const result = await studentServices.getStudentFromDB(studentID);
    res.status(200).json({
      success: true,
      message: 'Single student are retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const studentControllers = {
  createStudent,
  getAllStudent,
  getStudent,
};
