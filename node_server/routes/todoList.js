/* eslint-disable import/no-commonjs */
const express = require("express");

const userModel = require("../schemas/user");
const baseResponse = require("../utils/response");
const dataBaseCallback = require("../utils/dataBaseCallback");

const router = express.Router();

class listItem {
  constructor(title, date, time) {
    this.title = title;
    this.date = date;
    this.time = time;
  }
}

router.get("/getTodoList", function(req, res) {
  const Authorization = req.get("Authorization");
  if (!Authorization) {
    res.json(baseResponse(401, "没有权限"));
  }
  userModel.findOne(
    { Authorization },
    "list",
    dataBaseCallback(res, docs => {
      if (!docs) {
        userModel.create(
          { Authorization, list: [], focusTimes: 0, listLength: 0 },
          dataBaseCallback(res, () => {
            res.json(baseResponse());
          })
        );
      } else {
        res.json(baseResponse(undefined, undefined, docs));
      }
    })
  );
});

router.post("/addTodoList", function(req, res) {
  const Authorization = req.get("Authorization");
  const { title, date, time } = req.body;
  if (!Authorization) {
    res.json(baseResponse(401, "没有权限"));
  }
  userModel.findOne(
    { Authorization },
    "list",
    dataBaseCallback(res, docs => {
      docs.updateOne(
        {
          $set: { list: [...docs.list, { title, date, time }] }
        },
        dataBaseCallback(res, () => {
          res.json(baseResponse());
        })
      );
    })
  );
});

router.put("/alterTodoList", function(req, res) {
  const Authorization = req.get("Authorization");
  const { _id, title, date, time } = req.body;
  if (!Authorization) {
    res.json(baseResponse(401, "没有权限"));
  }
  userModel.findOne(
    { Authorization },
    "list",
    dataBaseCallback(res, docs => {
      docs.updateOne(
        {
          $set: {
            list: docs.list.map(item =>
              item._id.toString() === _id
                ? new listItem(title, date, time)
                : item
            )
          }
        },
        dataBaseCallback(res, () => {
          res.json(baseResponse());
        })
      );
    })
  );
});

router.delete("/deleteTodoList", function(req, res) {
  const Authorization = req.get("Authorization");
  const { _id } = req.body;
  if (!Authorization) {
    res.json(baseResponse(401, "没有权限"));
  }
  userModel.findOne(
    { Authorization },
    "list",
    dataBaseCallback(res, docs => {
      docs.updateOne(
        {
          $set: {
            list: docs.list.filter(item => item._id.toString() !== _id)
          }
        },
        dataBaseCallback(res, () => {
          res.json(baseResponse());
        })
      );
    })
  );
});

router.get("/finishTodoList/:_id", function(req, res) {
  const Authorization = req.get("Authorization");
  const { _id } = req.params;
  if (!Authorization) {
    res.json(baseResponse(401, "没有权限"));
  }
  userModel.findOne(
    { Authorization },
    "list listLength",
    dataBaseCallback(res, docs => {
      console.log("@", docs);
      docs.updateOne(
        {
          $set: {
            list: docs.list.filter(item => item._id.toString() !== _id),
            listLength: docs.listLength + 1
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
