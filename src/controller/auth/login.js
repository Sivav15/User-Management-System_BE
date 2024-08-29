const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../../model/userModel");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(404).json({
        message: "User does not exist",
      });

    if (!user.password) {
      return res.status(400).json({
        message: "Invalid credentials.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Invalid credentials",
      });

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      token: jwtToken,
      message: "Login successful",
      id: user._id,
      avatar: user.avatar,
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
      profession: user.profession,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = login;
