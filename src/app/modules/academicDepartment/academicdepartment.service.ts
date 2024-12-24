import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  // call the academic model
  const result = await AcademicDepartment.create(payload);
  return result;
};
// get all student data
const getALLAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};
// get a single data
const getAcademicDepartmentFromDB = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty');
  return result;
};
const updateAcademicDepartmentFromDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};
export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getALLAcademicDepartmentsFromDB,
  getAcademicDepartmentFromDB,
  updateAcademicDepartmentFromDB,
};
