const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  text: String,
  from: String,
  to: String,
});

const Message = mongoose.model("Message", messageSchema);

const getAll = (req, res) => {
  res.send("getAll");
};

const getOne = (req, res) => {
  res.send("getOne");
};

const create = (req, res) => {
  let message = new Message();
  message.text = "This is a message!";
  message.from = "Aaron";
  message.to = "Timmy";
  message.save((err, doc) => {
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
