/* eslint-disable import/no-commonjs */
/*
 * @Author: Luo Wei
 * @Date: 2022-04-08 15:25:34
 * @LastEditors: Luo Wei
 * @LastEditTime: 2022-04-08 16:30:58
 */
const express = require("express");
const userModel = require("../schemas/user");
const baseResponse = require("../utils/response");
const dataBaseCallback = require("../utils/dataBaseCallback");

const router = express.Router();

router.get("/timesIncrement", function(req, res) {
  const Authorization = req.get("Authorization");
  console.log(Authorization);
  if (!Authorization) {
    res.json(baseResponse(401, "没有权限"));
  }
  userModel.findOne(
    { Authorization },
    "focusTimes",
    dataBaseCallback(res, docs => {
      docs.updateOne(
        {
          $set: {
            focusTimes: docs.focusTimes + 1
          }
        },
        dataBaseCallback(res, () => {
          res.json(baseResponse());
        })
      );
    })
  );
});

module.exports = router;
