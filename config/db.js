const mongoose = require('mongoose');
const config = require('config');
const db = config.get('databaseURI');

const connectDB =async () => {

    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Mongo DB connected')
    }catch(error){
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB