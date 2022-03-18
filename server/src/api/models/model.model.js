const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    cc: { type: Number, required: true, trim: true },
    image: { type: String, required: false, trim: true },
    brand: { type: String, required: true, trim: true },
},
    {
        timestamps: true
    });

const Model = mongoose.model('Model', modelSchema);
module.exports = Model;