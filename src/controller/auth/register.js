const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../../model/userModel");

const register = async (req, res) => {
  const { name, password, email, phoneNumber, profession } = req.body;
  console.log(req.body);

  try {
    const user = await userModel.findOne({ email });
    if (user) return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      phoneNumber,
      profession,
      password: hashedPassword,
      avatar: `https://ui-avatars.com/api/?name=${name.split(" ")[0]}`,
    });

    await newUser.save();

    const jwtToken = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Registered successfully",
      token: jwtToken,
      id: newUser._id,
      avatar: newUser.avatar,
      email: newUser.email,
      name: newUser.name,
      phoneNumber: newUser.phoneNumber,
      profession: newUser.profession,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
};

module.exports = register;
