const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
const Profile = require("../profile");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const user = req.user;
    console.log({ user });

    if (user.role === "basic") {
      return res.json({
        status: "401",
        error: "User unauthorized!",
      });
    }

    return res.json({
      status: "200",
      user,
    });
  } catch (error) {
    console.error({
      error: error.message,
    });
    return res.json({
      status: "500",
      error: "Server error",
    });
  }
});

module.exports = router;
