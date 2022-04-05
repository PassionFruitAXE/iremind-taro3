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
  userModel.findOne(
    { Authorization },
    "list",
    dataBaseCallback(res, docs => {
      res.json(baseResponse(undefined, undefined, docs));
    })
  );
});

router.post("/addTodoList", function(req, res) {
  const Authorization = req.get("Authorization");
  const { title, date, time } = req.body;
  if (!Authorization) {
    res.json(baseResponse(401, "没有权限"));
  }
  userModel.findOne({ Authorization }, "list", (err, docs) => {
    if (err) {
      console.error(err);
      res.send(err);
    } else {
      if (docs === null) {
        userModel.create(
          { Authorization, list: { title, date, time } },
          dataBaseCallback(res, () => {
            res.json(baseResponse());
          })
        );
      } else {
        docs.update(
          {
            $set: { list: [...docs.list, { title, date, time }] }
          },
          dataBaseCallback(res, () => {
            res.json(baseResponse());
          })
        );
      }
    }
  });
});

router.put("/alterTodoList", function(req, res) {
  const Authorization = req.get("Authorization");
  const { _id, title, date, time } = req.body;
  userModel.findOne(
    { Authorization },
    "list",
    dataBaseCallback(res, docs => {
      docs.update(
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
  userModel.findOne(
    { Authorization },
    "list",
    dataBaseCallback(res, docs => {
      docs.update(
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

module.exports = router;
