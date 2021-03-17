const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  text: String,
  from: String,
  to: String,
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
