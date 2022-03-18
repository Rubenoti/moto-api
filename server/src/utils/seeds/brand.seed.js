const mongoose = require('mongoose');
const Brand = require('../../../src/api/brands/brand.model');
require('dotenv').config();

const URIDB = process.env.MONGO_DB;

const brands = [
    {
        name: "BMW",
        description: "",
        country: "Alemania",
        logo: "https://res.cloudinary.com/dd3vgq4ks/image/upload/v1647615041/Assets-motoApi/bmw-logo-1_pdtnf9.png",
        models: [],
    },
    {
        name: "Benelli",
        description: "",
        country: "Italia",
        logo: "https://res.cloudinary.com/dd3vgq4ks/image/upload/v1647615040/Assets-motoApi/benelli-logo_qgchyl.svg",
        models: [],
    },
    {
        name: "Aprilia",
        description: "",
        country: "Italia",
        logo: "https://res.cloudinary.com/dd3vgq4ks/image/upload/v1647615040/Assets-motoApi/aprilia-logo_wulsm4.png",
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