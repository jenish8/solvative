if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//packages
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

//routes
const userRoutes = require("./app/routes/user.routes");

const app = express();

//Database Connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

//Configs
var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

//enable cors
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// parse requests of content-type - application/json
app.use(express.json({ limit: "50mb" }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

//Set File Limit
app.use(bodyParser.json({ limit: "50mb" }));
//parse cookies
app.use(cookieParser());

//public folder
app.use("/public", express.static(path.join(__dirname, "./app/public")));

//swagger-ui init
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

//Routes
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to SE project");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Port Listening on ${PORT}`);
});
