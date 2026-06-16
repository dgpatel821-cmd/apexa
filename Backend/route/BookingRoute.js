const express = require("express");
const router = express.Router();
const Enquiry = require("../modal/BookingEnquiry");

/* CREATE ENQUIRY */
router.post("/", async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.status(201).json({ success: true, enquiry });
  } catch (err) {
    res.status(500).json({ message: "Error creating enquiry" });
  }
});

/* GET ALL ENQUIRIES (Admin) */
router.get("/", async (req, res) => {
  const enquiries = await Enquiry.find().sort({ createdAt: -1 });
  res.json({ enquiries });
});

/* DELETE ENQUIRY (Admin) */
router.delete("/:id", async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }
    res.json({ success: true, message: "Enquiry deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;