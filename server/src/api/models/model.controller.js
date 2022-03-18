const Model = require('./model.model')
const { setError } = require('../../utils/errors/errors')
const { deleteImgCloudinary } = require('../../middlewares/files-cloudinary/deleteFile');

const getAllModel = async (req, res, next) => {
    try {
        const models = await Model.find();
        return res.status(200).json(models);
    } catch (error) {
        return next(setError(500, "Fail to get all models"))
    }
}
const getOneModel = async (req, res, next) => {
    try {
        const { id } = req.params;
        const model = await Model.findById(id).populate('brand');
        if (!model) {
            return next(setError(404, "Model not found"))
        }
        return res.status(200).json(model);
    } catch (error) {
        return next(setError(500, "Fail to get one model"))
    }
}
const createModel = async (req, res, next) => {
    try {
        const model = new Model(req.body);
        const duplicateModel = await Model.findOne({ name: model.name });
        if (duplicateModel) {
            return next(setError(400, "Model already exist"))
        }
        if (req.file) model.image = req.file.path;
        const newModel = await model.save();
        return res.status(201).json(newModel);
    } catch (error) {
        return next(setError(500, "Fail to create model"))
    }
}
const updateModel = async (req, res, next) => {
    try {
        const { id } = req.params;
        const model = new Model(req.body);
        model._id = id;

        if (req.file) {
            const modelImage = await Model.findById(id);
            if (modelImage.image) deleteImgCloudinary(modelImage.image)
            model.image = req.file.path;
        }
        const updateModel = await Model.findByIdAndUpdate(id, model);
        if (!updateModel) {
            return next(setError(404, "Model not found"))
        }
        return res.status(200).json(updateModel);
    } catch (error) {
        return next(setError(500, "Fail to update model"))
    }
}
const deleteModel = async (req, res, next) => {
    try {
        const { id } = req.params;
        const model = await Model.findByIdAndDelete(id);
        if (!model) {
            return next(setError(404, "Model not found"))
        }
        if (model.image) deleteImgCloudinary(model.image)
        return res.status(200).json(model);
    } catch (error) {
        return next(setError(500, "Fail to delete model"))
    }
}


module.exports = {
    getAllModel,
    getOneModel,
    createModel,
    updateModel,
    deleteModel
}