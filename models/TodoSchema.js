const { Schema, model } = require("mongoose");

const TodoSchema = new Schema({
  todo: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Todo", TodoSchema);
