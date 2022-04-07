/* eslint-disable import/no-commonjs */
/*
 * @Author: Luo Wei
 * @Date: 2022-04-01 21:35:04
 * @LastEditors: Luo Wei
 * @LastEditTime: 2022-04-07 21:16:26
 */
const mongoose = require("mongoose");

// const url =
//   "mongodb+srv://shallowwind:lw13708137873@luowei.way4e.mongodb.net/data?retryWrites=true&w=majority";

const url = "mongodb://localhost:27017/users";

mongoose.connect(url);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error!"));
db.once("open", function() {
  console.log("We are Connected to MongoDB 'data' Database");
});
