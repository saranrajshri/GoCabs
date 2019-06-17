const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
// Database datails
const config = require("./config/database");

//Routes
const userRoutes = require("./routes/UserRoutes");
const driverRoutes = require("./routes/DriverRoutes");
// session
app.use(
  session({
    name: "sessionID",
    secret: "abc",
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
    resave: true,
    saveUninitialized: true
  })
);

// Database connection
mongoose
  .connect(config.database)
  .then(function(response) {
    console.log("MongoConnected");
  })
  .catch(function(response) {
    console.log("MongoEror");
  });

// To avoid Cors error
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

// Use routes
app.use("/api/user", userRoutes);
app.use("/api/driver", driverRoutes);
// Running Port
const port = process.eventNames.PORT || 8000;
app.listen(port, () => {
  console.log(`Port open at ${port}`);
});
