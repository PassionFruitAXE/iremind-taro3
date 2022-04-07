/* eslint-disable import/no-commonjs */
/*
 * @Author: Luo Wei
 * @Date: 2022-04-02 20:55:44
 * @LastEditors: Luo Wei
 * @LastEditTime: 2022-04-07 21:43:56
 */
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Authorization: String,
  list: [
    {
      title: String,
      date: String,
      time: String
    }
  ],
  focusTime: Number,
  ListLength: Number,
});

module.exports = mongoose.model("users", UserSchema);
