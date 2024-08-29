const userModel = require("../../model/userModel");

const updateUser = async (req, res) => {
  const { name, phoneNumber, profession } = req.body;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Id is required",
    });
  }

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { name, phoneNumber, profession },
      { new: true, runValidators: true, projection: { password: 0 } }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = updateUser;
