const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
// const dotenv = require("dotenv").config();
const dotenv = require("dotenv");

//dotenv config
dotenv.config();

connectDb();
const app = express();

//Middleware
app.use(express.json()); //this middleware allows for parsing the stream of data coming from the client
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes")); //for user register/login and authentication
app.use(errorHandler); //converts the html error to json

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
