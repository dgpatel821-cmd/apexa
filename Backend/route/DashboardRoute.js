const express = require("express");
const router = express.Router();

const Car = require("../modal/car");
const Booking = require("../modal/BookingEnquiry");
const Contact = require("../modal/Contact");

router.get("/", async (req, res) => {
  try {
    const totalCars = await Car.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalContacts = await Contact.countDocuments();

    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalCars,
      totalBookings,
      totalContacts,
      recentBookings,
      recentContacts,
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard Error" });
  }
});

module.exports = router;