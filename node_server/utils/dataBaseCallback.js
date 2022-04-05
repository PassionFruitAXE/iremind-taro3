const dataBaseCallback = (res, successCallback) => {
  return (err, docs) => {
    if (err) {
      console.error(err);
      res.send(err);
    } else successCallback(docs);
  };
};

module.exports = dataBaseCallback;
