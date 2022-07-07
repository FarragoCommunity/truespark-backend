const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: [true, "This category already exists"],
      lowercase: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }, 
    color: {
      type: String,
      required: [true, "Color is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
