const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");

//Route
const PoetRoute = require("./Routes/PoetRoute");
const PoetryRoute = require("./Routes/PoetryRoute");
//dotenv configure
require("dotenv").config();

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//cors
app.use(cors());
//port number
let port = process.env.PORT;

//mongoose Connected
mongoose.connect(process.env.MONGOURL).then(() => {
  console.log("DB connected!!!");
});

//Routes
app.use("/poet", PoetRoute);
app.use("/poetry", PoetryRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
