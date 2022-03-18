const mongoose = require('mongoose');
const Model = require('../../../src/api/models/model.model');
require('dotenv').config();
const URIDB = process.env.MONGO_DB;


const models = [
    {
        name: "F-700-PS",
        type: "Naked",
        cc: "700",
        image: "https://res.cloudinary.com/dd3vgq4ks/image/upload/v1647615050/Assets-motoApi/BMW-F-700-GS_vl6vpo.jpg",
        brand: "BMW",

    },
    {
        name: "R-1250-RS",
        type: "Sport",
        cc: "1250",
        image: "https://res.cloudinary.com/dd3vgq4ks/image/upload/v1647615049/Assets-motoApi/BMW-R-1250-RS_ueuafw.jpg",
        brand: "BMW",

    },
    {
        name: "BN600",
        type: "Naked",
        cc: "600",
        image: "https://res.cloudinary.com/dd3vgq4ks/image/upload/v1647615049/Assets-motoApi/benelli-bn-600-r_dxm65f.jpg",
        brand: "Benelli",
    },
    {
        name: "TRK-502",
        type: "Trial",
        cc: "500",
        image: "https://res.cloudinary.com/dd3vgq4ks/image/upload/v1647615049/Assets-motoApi/benelli_TRK502_zn28g7.jpg",
        brand: "Benelli",
    },
    {
        name: "RSV4",
        type: "Sport",
        cc: "1000",
        image: "https://res.cloudinary.com/dd3vgq4ks/image/upload/v1647615049/Assets-motoApi/aprilia-rsv4_sdlnfu.jpg",
        brand: "Aprilia",
    },
    {
        name: "RS125",
        type: "Sport",
        cc: "125",
        image: "https://res.cloudinary.com/dd3vgq4ks/image/upload/v1647615049/Assets-motoApi/aprilia-rs-125_ls6ikx.jpg",
        brand: "Aprilia",
    },


]

mongoose.connect(URIDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
    const allModels = await Model.find();
    if (allModels.length) {
        await Model.collection.drop();
        console.log('Models drop');
    }
}).catch((err) => console.error("Error in drop")).then(async () => {
    await Model.insertMany(models);
    console.log("Models created");
}).catch((err) => console.error("Error in create")).finally(() => mongoose.disconnect());