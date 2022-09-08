const monngoose = require("mongoose");
const { Schema } = monngoose;

const blogSchema = new Schema(
  {
    title: { type: String, required: true }, // String is shorthand for {type: String}
    author: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
monngoose.model("Blog", blogSchema);
