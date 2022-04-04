/*
 * @Author: Luo Wei
 * @Date: 2022-04-04 20:12:31
 * @LastEditors: Luo Wei
 * @LastEditTime: 2022-04-04 20:16:08
 */
/* eslint-disable import/no-commonjs */
const express = require("express");
// const userModel = require("../schemas/user");

const router = express.Router();

router.get("/getChartData", function(req, res) {
  res.send("/getChartData");
});

module.exports = router;
