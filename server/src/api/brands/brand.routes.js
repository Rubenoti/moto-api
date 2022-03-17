const BrandRoutes = require('express').Router();

const {
    getAllBrand,
    getOneBrand,
    createBrand,
    updateBrand,
    deleteBrand } = require('./brand.controller');


BrandRoutes.get('/', getAllBrand);
BrandRoutes.get('/:id', getOneBrand);
BrandRoutes.post('/', createBrand);
BrandRoutes.patch('/:id', updateBrand);
BrandRoutes.delete('/:id', deleteBrand);

module.exports = BrandRoutes;
