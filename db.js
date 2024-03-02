const mongoose = require("mongoose");
const url =
  "mongodb+srv://todo:todo123@cluster0.ah0hbso.mongodb.net/Todo_DB?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Database connected");
  } catch (e) {
    console.log(e);
  }
};

module.exports = mongoDB;
