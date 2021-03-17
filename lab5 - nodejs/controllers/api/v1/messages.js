const Message = require("../../../models/Message");

const getAll = (req, res) => {
  res.send("getAll");
};

const getOne = (req, res) => {
  res.send("getOne");
};

const create = (req, res, next) => {
  let message = new Message();
  message.text = req.body.text;
  message.from = req.body.from;
  message.to = req.body.to;
  message.save((err, doc) => {
    if (err) {
      res.json({
        status: "error",
        message: "Couldnot save this message",
      });
    }

    if (!err) {
      res.json({
        status: "success",
        data: {
          message: doc,
        },
      });
    }
  });
};

const updateOne = (req, res) => {
  res.send("updateOne");
};

const deleteOne = (req, res) => {
  res.send("deleteOne");
};

module.exports.getAll = getAll;
module.exports.getOne = getOne;
module.exports.create = create;
module.exports.updateOne = updateOne;
module.exports.deleteOne = deleteOne;
