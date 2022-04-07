/*
 * @Author: Luo Wei
 * @Date: 2022-04-04 20:12:31
 * @LastEditors: Luo Wei
 * @LastEditTime: 2022-04-07 22:03:13
 */
/* eslint-disable import/no-commonjs */
const express = require("express");
const userModel = require("../schemas/user");
const baseResponse = require("../utils/response");
const dataBaseCallback = require("../utils/dataBaseCallback");

const router = express.Router();

const message = [
  "天气晴朗，万物可爱",
  "请永远相信，美好的事情即将发生",
  "等风来，不如追风去"
];

router.get("/getChartData", function(req, res) {
  const { Authorization } = req.get("Authorization");
  userModel.findOne(
    { Authorization },
    "listLength focusTimes",
    dataBaseCallback(res, docs => {
      res.json(
        baseResponse(undefined, undefined, {
          myChartData: {
            ...(docs || { listLength: 10, focusTimes: 15 }),
            msg: message[~~(Math.random() * 3)]
          }
        })
      );
    })
  );
});

module.exports = router;
