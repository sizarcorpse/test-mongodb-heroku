require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const app = express();
app.use(helmet());
app.use(morgan("dev"));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    // eslint-disable-next-line comma-dangle
  })
);

mongoose.connect(
  process.env.MONGODB_URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connected to mongoDB")
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var Schema = mongoose.Schema;
mongoose.model("user", new Schema({ name: String }));
var users = mongoose.model("user");

app.get("/", async (req, res) => {
  const getall = await users.find();

  console.log(getall);
  res.status(200).json(getall);
});

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
