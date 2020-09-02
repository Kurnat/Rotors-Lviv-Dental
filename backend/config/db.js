const mongoose = require('mongoose');

const connectDb = async () => {
  const optionsDB = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }

  const conn = await mongoose.connect(process.env.MONGO_URI, optionsDB);
  console.log(`MongoDB Conected `.cyan);
}



module.exports = connectDb;
