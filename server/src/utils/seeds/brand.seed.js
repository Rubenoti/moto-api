const mongoose = require('mongoose');
const Brand = require('../../../src/models/brand.model');
require('dotenv').config();

const URIDB = process.env.MONGO_DB;

const brands = [
    {
        name: "BMW",
        description: "",
        country: "Alemania",
        logo: "",
        models: [],
    },
    {
        name: "Benelli",
        description: "",
        country: "Italia",
        logo: "",
        models: [],
    },
    {
        name: "Aprilia",
        description: "",
        country: "Italia",
        logo: "",
        models: [],
    },


]

mongoose.connect(URIDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
    const allBrands = await Brand.find();
    if (allBrands.length) {
        await Brand.collection.drop();
        console.log('Brands drop');
    }
}).catch((err) => console.error("Error in drop")).then(async () => {
    await Brand.insertMany(brands);
    console.log("Brands created");
}).catch((err) => console.error("Error in create")).finally(() => mongoose.disconnect());