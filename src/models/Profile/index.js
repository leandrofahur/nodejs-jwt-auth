const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
