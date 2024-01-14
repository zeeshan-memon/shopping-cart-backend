const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const productsSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    description: String,
    price: Number,
    inStock: Boolean,
    manufacturer: String,
    category: String,
  },
  { timestamps: true }
);

productsSchema.plugin(AutoIncrement, { id: "products", inc_field: "orderNo" });

module.exports = mongoose.model("products", productsSchema);
