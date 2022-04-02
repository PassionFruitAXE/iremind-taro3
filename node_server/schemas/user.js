/* eslint-disable import/no-commonjs */
/*
 * @Author: Luo Wei
 * @Date: 2022-04-02 20:55:44
 * @LastEditors: Luo Wei
 * @LastEditTime: 2022-04-02 21:09:39
 */
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  Authorization: String,
  list: [
    {
      id: Number,
      title: String,
      date: String,
      time: String
    }
  ]
});

module.exports = mongoose.model("user", schema);
