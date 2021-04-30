const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const config = require("config");

const router = express.Router();

// @route   POST user/
// @desc    Create/Update a user
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    let user = await User.findOne({ username });
    if (user) {
      return res.json({
        status: "400",
        message: "User already exists!",
      });
    }

    user = new User({
      username,
      password,
      role,
    });

    // encryption
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // json webtoken:
    const payload = {
      user: {
        id: user.id,
        role,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtToken"),
      { expiresIn: 36000000 },
      (error, token) => {
        if (error) throw error;
        return res.json({
          status: "200",
          user,
          token,
        });
      }
    );
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
