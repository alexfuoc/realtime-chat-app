var mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  messageContent: { type: String, required: true },
  timestamp: { type: String, required: true },
  username: { type: String, required: true },
  senderId: { type: String, required: true },
});

module.exports = mongoose.model("Message", messageSchema);
