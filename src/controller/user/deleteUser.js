const userModel = require("../../model/userModel");

const deleteUser = async (req, res) => {
  const { user_id } = req.headers;

  const { id } = req.params;

  if (!user_id) {
    return res.status(400).json({
      message: "User ID is required in headers",
    });
  }

  if (!id) {
    return res.status(400).json({
      message: "Id is required",
    });
  }

  if (user_id === id) {
    return res.status(400).json({
      message: "You cannot delete your own account.",
    });
  }

  try {
    // Find the user by ID and delete the user
    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
      user: {
        id: deletedUser._id,
        name: deletedUser.name,
        email: deletedUser.email,
        phoneNumber: deletedUser.phoneNumber,
        profession: deletedUser.profession,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = deleteUser;
