/* eslint-disable import/no-commonjs */
const express = require("express");
const userSchema = require("../schemas/user");

const router = express.Router();

/* GET users listing. */
router.get("/", function(req, res) {
  userSchema.create({}, (err, data) => {
    if (err) res.json("no");
    res.json("yes" + data);
  });
  res.send("respond with a resource");
});

module.exports = router;
