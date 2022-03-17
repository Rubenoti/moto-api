const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: { type: string, required: true, trim: true },
    description: { type: string, required: false, trim: true },
    country: { type: string, required: true, trim: true },
    logo: { type: string, required: false, trim: true },
},
    {
        timestamps: true
    });

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;