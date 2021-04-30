const mongoose = require("mongoose");
const config = require("config");
const dbConnectionString = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(dbConnectionString, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log("MongoDB connected...");
  } catch (error) {
    console.error({
      error: error.message,
    });
    process.exit(1);
  }
};

module.exports = connectDB;
