const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({});
const url = process.env.DB_URL;
async function DbConnection() {
  try {
    await mongoose.connect(url);
    console.log("DB connecion Successfull");
  } catch (error) {
    console.error(error);
  }
}

module.exports = { DbConnection };
