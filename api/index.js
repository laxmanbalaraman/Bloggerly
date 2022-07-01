const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const user = require("./routes/user");
const post = require("./routes/post");
const category = require("./routes/categories");
const multer = require("multer");
const path = require("path");
dotenv.config();

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err.message));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).send("File has bee uploaded");
});

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/post", post);
app.use("/api/categories", category);

app.listen("5000", () => {
  console.log("Server is running...");
});
