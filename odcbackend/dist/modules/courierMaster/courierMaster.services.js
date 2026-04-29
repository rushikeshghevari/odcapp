"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourierMasterService = exports.updateCourierMasterService = exports.getCourierMasterService = exports.createCourierMasterService = void 0;
const courierMaster_model_1 = require("./courierMaster.model");
// CREATE
const createCourierMasterService = async (company_name, contact_number) => {
    const existingCompany = await courierMaster_model_1.courier_masters.findOne({
        company_name,
        is_deleted: false,
    });
    if (existingCompany) {
        throw new Error("Courier company already exists");
    }
    return await courierMaster_model_1.courier_masters.create({
        company_name,
        contact_number,
    });
};
exports.createCourierMasterService = createCourierMasterService;
// GET ALL
const getCourierMasterService = async () => {
    return await courierMaster_model_1.courier_masters
        .find({ is_deleted: false })
        .sort({ createdAt: -1 });
};
exports.getCourierMasterService = getCourierMasterService;
// UPDATE
const updateCourierMasterService = async (id, company_name, contact_number) => {
    const existingCompany = await courierMaster_model_1.courier_masters.findOne({
        company_name,
        is_deleted: false,
        _id: { $ne: id },
    });
    if (existingCompany) {
        throw new Error("Courier company already exists");
    }
    return await courierMaster_model_1.courier_masters.findByIdAndUpdate(id, { company_name, contact_number }, { new: true });
};
exports.updateCourierMasterService = updateCourierMasterService;
// DELETE (SOFT)
const deleteCourierMasterService = async (id) => {
    return await courierMaster_model_1.courier_masters.findByIdAndUpdate(id, { is_deleted: true }, { new: true });
};
exports.deleteCourierMasterService = deleteCourierMasterService;
//# sourceMappingURL=courierMaster.services.js.map