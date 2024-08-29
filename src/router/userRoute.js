const express = require("express");
const updateUser = require("../controller/user/updateUser");
const getUser = require("../controller/user/getUser");
const deleteUser = require("../controller/user/deleteUser");
const authenticateJWT = require("../middleware/authenticateJWT");

const router = express.Router();

router.put("/:id", authenticateJWT, updateUser);
router.get("/", authenticateJWT, getUser);
router.delete("/:id", authenticateJWT, deleteUser);

module.exports = router;
