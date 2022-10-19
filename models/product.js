const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, requird: true },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, requird: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);