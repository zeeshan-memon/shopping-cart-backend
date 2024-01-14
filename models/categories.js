const mongoose = require("mongoose");
const categoriesSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
  },
  { timestamps: true }
);


module.exports = mongoose.model("categories", categoriesSchema);
