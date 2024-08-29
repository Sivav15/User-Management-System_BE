const userModel = require("../../model/userModel");

const getUser = async (req, res) => {
  const { user_id } = req.headers;

  try {
    if (!user_id) {
      return res.status(400).json({
        message: "User ID is required in headers",
      });
    }

    const users = await userModel.find({}, "-password");

    const currentUser = users.find((user) => user._id.toString() === user_id);
    const otherUsers = users.filter((user) => user._id.toString() !== user_id);

    if (!currentUser) {
      return res.status(404).json({
        message: "User not found. Please log in to continue.",
      });
    }

    res.status(200).json({
      message: "User details retrieved successfully",
      users: [currentUser, ...otherUsers],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = getUser;

module.exports = getUser;
