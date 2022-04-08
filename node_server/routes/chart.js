/*
 * @Author: Luo Wei
 * @Date: 2022-04-04 20:12:31
 * @LastEditors: Luo Wei
 * @LastEditTime: 2022-04-08 18:30:58
 */
/* eslint-disable import/no-commonjs */
const express = require("express");
const userModel = require("../schemas/user");
const baseResponse = require("../utils/response");
const dataBaseCallback = require("../utils/dataBaseCallback");

const router = express.Router();

const message = [
  "天气晴朗，万物可爱",
  "美好的事情即将发生",
  "等风来，不如追风去"
];

router.get("/getChartData", function(req, res) {
  const Authorization = req.get("Authorization");
  if (!Authorization) {
    res.json(baseResponse(401, "没有权限"));
  }
  userModel.findOne(
    { Authorization },
    "listLength focusTimes",
    dataBaseCallback(res, docs => {
      res.json(
        baseResponse(undefined, undefined, {
          myChartData: {
            listLength: docs.listLength,
            focusTimes: docs.focusTimes,
            msg: message[~~(Math.random() * 3)]
          }
        })
      );
    })
  );
});

module.exports = router;
