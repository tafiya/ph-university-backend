import { Request, Response } from 'express';
import { studentServices } from './student.services';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // data validation using JOI
    // const { value, error } = studentValidationSchema.validate(studentData);

    // data validation using Zod
    const zodParseData = studentValidationSchema.parse(studentData);

    const result = await studentServices.createStudentIntoDb(zodParseData);
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'student is not created successfully',
    //     error,
    //   });
    // }
    // send response
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'student is not created successfully',
      data: err,
    });
  }
};
const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getALLStudentFromDB();
    // console.log(result);
    res.status(200).json({
      success: true,
      message: 'students are retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'student is not created successfully',
      data: error,
    });
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'student is not created successfully',
      data: error,
    });
  }
};
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    // another way
    // const data=req.params.studentID
    const result = await studentServices.deleteStudentFromDB(studentID);
    res.status(200).json({
      success: true,
      message: 'Single student are deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'student is not deleted  successfully',
      data: error,
    });
  }
};
const updateStudent = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const updateData = req.body;
    // another way
    // const data=req.params.studentID
    const result = await studentServices.updateStudentFromDB(
      studentID,
      updateData,
    );

    res.status(200).json({
      success: true,
      message: 'Single student is updated successfully',
      result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'student is not update  successfully',
      error,
    });
  }
};

export const studentControllers = {
  createStudent,
  getAllStudent,
  getStudent,
  deleteStudent,
  updateStudent,
};
