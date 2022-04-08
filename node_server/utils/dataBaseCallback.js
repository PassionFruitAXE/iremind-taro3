/* eslint-disable import/no-commonjs */
const baseResponse = require("./response");

/**
 *
 * @param {Object} res http: res
 * @param {Function} successCallback
 * @returns
 */
const dataBaseCallback = (res, successCallback) => {
  return (err, docs) => {
    if (err) {
      console.error(err);
      res.json(baseResponse(undefined, err));
    } else successCallback(docs);
  };
};

module.exports = dataBaseCallback;
