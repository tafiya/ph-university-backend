"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.get('/', admin_controller_1.adminControllers.getAllAdmin);
router.get('/:id', admin_controller_1.adminControllers.getAdmin);
router.delete('/:id', admin_controller_1.adminControllers.deleteAdmin);
router.patch('/:id', admin_controller_1.adminControllers.updateAdmin);
exports.adminRoutes = router;
