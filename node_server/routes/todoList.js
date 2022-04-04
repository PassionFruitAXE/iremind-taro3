/* eslint-disable import/no-commonjs */
const express = require("express");

const userModel = require("../schemas/user");
const baseResponse = require("../utils/response");

const router = express.Router();

function errorCallback(err) {
  console.error(err);
}

router.get("/getTodoList", function(req, res) {
  res.send("/getTodoList");
});

router.post("/addTodoList", function(req, res) {
  const Authorization = req.get("Authorization");
  const { title, date, time } = req.body;
  if (!Authorization) {
    res.json(baseResponse(401, "没有权限"));
  }
  userModel.findOne({ Authorization }, "list", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      if (data === null) {
        userModel.create(
          { Authorization, list: { title, date, time } },
          errorCallback
        );
      } else {
        data.update(
          {
            $set: { list: [...data.list, { title, date, time }] }
          },
          errorCallback
        );
      }
    }
  });
  res.json(baseResponse());
});

router.put("/alterTodoList", function(req, res) {
  res.send("/alterTodoList");
});

router.delete("/deleteTodoList", function(req, res) {
  res.send("/deleteTodoList");
});

module.exports = router;
