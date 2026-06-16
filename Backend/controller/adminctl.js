const jwt = require("jsonwebtoken");

// 🔒 STATIC ADMIN CREDENTIALS
const ADMIN_EMAIL = "haresh@apexa.com";
const ADMIN_PASSWORD = "Haresh@123";

exports.loginAdmin = (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    { email: ADMIN_EMAIL, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    success: true,
    message: "Login successful",
    token,
  });
};