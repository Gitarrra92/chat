const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});

//collection
module.exports = mongoose.model("messagecontents", chatSchema);

//WyFf7R0XIxQsAXI7;

//dcb9b61e9c177fa13caf5a5abddefe0dbe90a976696051277f82da9ac1880d8b;
