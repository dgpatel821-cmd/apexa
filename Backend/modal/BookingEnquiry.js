const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car"
    },
    carName: String,
    price: Number,
    message: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookingEnquiry", enquirySchema);