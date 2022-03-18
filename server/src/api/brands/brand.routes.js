const BrandRoutes = require('express').Router();
const upload = require('../../middlewares//files-cloudinary/updateFile');
const { isAuth } = require('../../middlewares/auth/auth');
const {
    getAllBrand,
    getOneBrand,
    createBrand,
    updateBrand,
    deleteBrand } = require('./brand.controller');


BrandRoutes.get('/', getAllBrand);
BrandRoutes.get('/:id', getOneBrand);
BrandRoutes.post('/', [isAuth], upload.single('logo'), createBrand);
BrandRoutes.patch('/:id', [isAuth], upload.single('logo'), updateBrand);
BrandRoutes.delete('/:id', [isAuth], deleteBrand);

module.exports = BrandRoutes;
