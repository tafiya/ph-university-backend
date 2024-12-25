import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { adminServices } from './admin.service';

const getAllAdmin = catchAsync(async (req, res, next) => {
  const result = await adminServices.getALLAdminFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Admins are retrieved successfully',
    data: result,
  });
});
// get a single data
const getAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await adminServices.getAdminFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Single Admin is retrieved successfully',
    data: result,
  });
});
const deleteAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await adminServices.deleteAdminFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Single admin is deleted successfully',
    data: result,
  });
});
const updateAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await adminServices.updateAdminIntoDB(id, admin);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Single admin is updated successfully',
    data: result,
  });
});

export const adminControllers = {
  getAllAdmin,
  getAdmin,
  deleteAdmin,
  updateAdmin,
};
