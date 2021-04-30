const connectDB = require("../config/db");
const express = require("express");

const app = express();

connectDB();

app.use(express.json({ extended: true }));
app.use("/user", require("./routes/user"));

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
