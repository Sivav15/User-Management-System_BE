const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const database = require("./src/config/database");
const authRoute = require("./src/router/authRouter");
const usersRoute = require("./src/router/userRoute");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

database();

app.get("/", (req, res) =>
  res.status(200).json({
    message: "server is running successful",
  })
);

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
