const mongoose = require('mongoose');
const Model = require('../../../src/models/Model.model');
require('dotenv').config();
const URIDB = process.env.MONGO_DB;


const models = [
    {
        name: "F-700-PS",
        type: "Naked",
        cc: "700",
        image: "",
        brand: "",

    },
    {
        name: "R-1250-RS",
        type: "Sport",
        cc: "1250",
        image: "",
        brand: "",

    },
    {
        name: "BN600",
        type: "Naked",
        cc: "600",
        image: "",

    },
    {
        name: "TRK-502",
        type: "Trial",
        cc: "500",
        image: "",

    },
    {
        name: "RSV4",
        type: "Sport",
        cc: "1000",
        image: "",

    },
    {
        name: "RS125",
        type: "Sport",
        cc: "125",
        image: "",

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