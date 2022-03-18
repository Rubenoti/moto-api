const Brand = require('./brand.model')
const { setError } = require('../../utils/errors/errors')
const { deleteImgCloudinary } = require('../../middlewares/files-cloudinary/deleteFile');

const getAllBrand = async (req, res, next) => {
    try {
        const brands = await Brand.find();
        return res.status(200).json(brands);
    } catch (error) {
        return next(setError(500, "Fail to get all brands"))
    }
}
const getOneBrand = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Brand.findById(id).populate('models')
        if (!product) {
            return next(setError(404, "Brand not found"))
        }
        return res.status(200).json(product);
    } catch (error) {
        return next(setError(500, "Fail to get one brand"));
    }
}
const createBrand = async (req, res, next) => {
    try {
        const brand = new Brand(req.body);
        const duplicateBrand = await Brand.findOne({ name: brand.name });
        if (duplicateBrand) {
            return next(setError(400, "Brand already exist"))
        }
        if (req.file) brand.image = req.file.path;
        const newBrand = await brand.save();
        return res.status(201).json(newBrand);
    } catch (error) {
        return next(setError(500, "Fail to create brand"))
    }
}
const updateBrand = async (req, res, next) => {
    try {
        const { id } = req.params;
        const brand = new Brand(req.body);
        brand._id = id;
        if (req.file) {
            const brandImage = await Brand.findById(id);
            if (brandImage.image) deleteImgCloudinary(brandImage.image)
            brand.image = req.file.path;
        }
        const updatebrand = await Brand.findByIdAndUpdate(id, brand);
        if (!updatebrand) {
            return next(setError(404, "Brand not found"))
        }
        return res.status(200).json(updatebrand);
    } catch (error) {
        return next(setError(500, "Fail to update brand"))
    }
}
const deleteBrand = async (req, res, next) => {
    try {
        const { id } = req.params;
        const brand = await Brand.findByIdAndDelete(id);
        if (!brand) {
            return next(setError(404, "Brand not found"))
        }
        if (brand.image) deleteImgCloudinary(brand.image)
        return res.status(200).json(product);


    } catch (error) {
        return next(setError(500, "Fail to delete brand"))
    }
}



module.exports = {
    getAllBrand,
    getOneBrand,
    createBrand,
    updateBrand,
    deleteBrand
}