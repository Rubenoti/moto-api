const ModelRoutes = require('express').Router();
const upload = require('../../middlewares//files-cloudinary/updateFile');
const { isAuth } = require('../../middlewares/auth/auth');
const {
    getAllModel,
    getOneModel,
    createModel,
    updateModel,
    deleteModel
} = require('./model.controller');

ModelRoutes.get('/', getAllModel);
ModelRoutes.get('/:id', getOneModel);
ModelRoutes.post('/', [isAuth], upload.single('image'), createModel);
ModelRoutes.patch('/:id', [isAuth], upload.single('image'), updateModel);
ModelRoutes.delete('/:id', [isAuth], deleteModel);

module.exports = ModelRoutes;
