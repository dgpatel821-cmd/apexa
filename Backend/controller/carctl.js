const Car = require("../modal/car");
const fs = require("fs");
const path = require("path");

/* ADD CAR */
// exports.addCar = async (req, res) => {
//   try {
//     const { name, category, seats, price } = req.body;

//     const car = await Car.create({
//       name,
//       category,
//       seats,
//       price,
//       image: req.file
//         ? `/uploads/${req.file.filename}`
//         : "",
//     });

//     res.status(201).json({
//       success: true,
//       message: "Car added successfully",
//       car,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

/* GET CARS */
exports.getCars = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};
    if (category && category !== "All") {
      filter.category = category;
    }

    const cars = await Car.find(filter).sort({ createdAt: -1 });

    res.json({ success: true, cars });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* UPDATE CAR */
exports.updateCar = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const car = await Car.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      message: "Car updated successfully",
      car,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* DELETE CAR */
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    // Delete image file if exists
    if (car.image) {
      const imagePath = path.join(__dirname, "..", car.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Car.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Car deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};