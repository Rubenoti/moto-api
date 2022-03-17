const ModelRoutes = require('express').Router();
const {
    getAllModel,
    getOneModel,
    createModel,
    updateModel,
    deleteModel
} = require(' ./model.controller');

ModelRoutes.get('/', getAllModel);
ModelRoutes.get('/:id', getOneModel);
ModelRoutes.post('/', createModel);
ModelRoutes.patch('/:id', updateModel);
ModelRoutes.delete('/:id', deleteModel);

module.exports = ModelRoutes;
