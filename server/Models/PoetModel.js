const mongoose = require("mongoose");

const PoetSchema = mongoose.Schema({
  poetName: {
    type: String,
    required: true,
  },
  poetEmail: {
    type: String,
    required: true,
  },
  poetPass: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("poet", PoetSchema);
