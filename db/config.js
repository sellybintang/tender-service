const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();
const DB_MONGODB = process.env.DB_MONGODB;

const database = () => {
  try {
    mongoose.connect(DB_MONGODB);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
    console.log("Failed to connect to MongoDB");
  }
};

module.exports = database;
