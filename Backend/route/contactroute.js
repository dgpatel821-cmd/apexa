const express = require("express");
const router = express.Router();
const Contact = require("../modal/Contact");

// Create enquiry
router.post("/", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();

    res.status(201).json({ message: "Enquiry saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all enquiries (Admin)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;