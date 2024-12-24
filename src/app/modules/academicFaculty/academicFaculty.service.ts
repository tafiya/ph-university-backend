import { AcademicFaculty } from './academicFaculty.model';
import { TAcademicFaculty } from './acdemicFaculty.interface';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  // call the academic model
  const result = await AcademicFaculty.create(payload);
  return result;
};
// get all student data
const getALLAcademicFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};
// get a single data
const getAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};
const updateAcademicFacultyFromDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};
export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getALLAcademicFacultiesFromDB,
  getAcademicFacultyFromDB,
  updateAcademicFacultyFromDB,
};
