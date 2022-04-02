/* eslint-disable import/no-commonjs */
/*
 * @Author: Luo Wei
 * @Date: 2022-04-01 21:35:04
 * @LastEditors: Luo Wei
 * @LastEditTime: 2022-04-01 21:43:29
 */
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error!"));
db.once("open", function() {
  console.log("We are Connected to MongoDB");
});
