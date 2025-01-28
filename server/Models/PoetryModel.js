const mongoose = require("mongoose");

const PoetrySchema = mongoose.Schema({
  poetryName: {
    type: String,
    required: true,
  },
  poetryContent: {
    type: String,
    required: true,
  },
  poetid: {
    type: mongoose.Types.ObjectId,
    ref: "poet",
    required: true,
  },
  poetName: {
    type: String,
    ref: "poet",
    required: true,
  },
  reviews: [
    {
      comment: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("poetry", PoetrySchema);
