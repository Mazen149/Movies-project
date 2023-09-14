require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const moviesRouter = require("./routes/movies");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.CONNECTION_STRING, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

app.use("/movies", moviesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
