const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

//PORT is the port number, if not, it is 8000
const uri = process.env.NEWS_DB_URI;

mongoose
  .connect(uri, { wtimeoutMS: 2500, useNewUrlParser: true })
  .then(() => console.log("Connected to the database"))
  .catch((err) => {
    console.log(err);
  });
