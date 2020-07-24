const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const multer = require("multer");

// model
const Order = require("./models/OrdersSchema");

// Database datails
const config = require("./config/database");

//Routes
const userRoutes = require("./routes/UserRoutes");
const driverRoutes = require("./routes/DriverRoutes");
const orderRoutes = require("./routes/OrderRoutes");

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
app.use("/api/order", orderRoutes);

// multer/////////
var recentFileName = "";
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "client/public/uploads");
  },
  filename: function(req, file, cb) {
    recentFileName = file.fieldname + "-" + "landmark";
    console.log("After" + recentFileName);
    cb(null, recentFileName);
  }
});

var upload = multer({ storage: storage });

app.post("/upload", upload.single("myImage"), (req, res, next) => {
  const file = req.file;
  Order.findOneAndUpdate(
    { userid: req.body.userid },
    { landMarkPicture: file.filename }
  );
  console.log("After" + recentFileName);

  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    console.log("File empty");
    return next(error);
  } else {
    console.log("File not empty");
  }

  res.send("success");
});
// ///////////////////
// Running Port
const port = process.eventNames.PORT || 8000;
app.listen(port, () => {
  console.log(`Port open at ${port}`);
});
