const express = require("express");
const router = express.Router();

const {
  addCar,
  getCars,
  updateCar,
  deleteCar,
} = require("../controller/carctl");
const Car = require("../modal/car");
const multer = require("multer");
const protect = require("../middleware/auth");
const upload = require("../middleware/upload");

/* ADMIN ROUTES */
router.post("/", protect, (req, res) => {
  upload.single("image")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "Image must be less than 5MB",
        });
      }
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    try {
      const { name, category, seats, price } = req.body;

      const car = await Car.create({
        name,
        category,
        seats,
        price,
        image: req.file
          ? `/uploads/${req.file.filename}`
          : "",
      });

      res.status(201).json({
        success: true,
        message: "Car added successfully",
        car,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });
});
router.put("/:id", protect, upload.single("image"), updateCar);
router.delete("/:id", protect, deleteCar);

/* PUBLIC ROUTE */
router.get("/", getCars);

module.exports = router;