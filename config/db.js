const mongoose = require("mongoose");




const connectMongoDB = async() => {
    try {
        await mongoose.connect(process.env.CONNECT_MONGODB);
        console.log(`success connect DB`);
    } catch (error) {
        console.log(`error validation`, error);
    }
}



module.exports = connectMongoDB;