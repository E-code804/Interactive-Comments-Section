const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const commentsRoutes = require("./routes/comments.js");
require("dotenv").config();

const app = express();

// middleware
app.use(express.json()); // any request that comes in, checks to see if it has some body/data, and if it does, parse and attach it to the req parameter
app.use(cors());
app.use((req, res, next) => {
  // fires for every request that comes in
  console.log(req.path, req.method);
  next();
});

app.use("/api/comments", commentsRoutes);

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db and listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
