const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
const Buffer = require("buffer/").Buffer;
const multer = require("multer");
const bodyParser = require("body-parser");

require("dotenv").config();

//Import if want to create new xlsx doc for download
// const { createXlsx } = require("../functions/xlsxFunctions");

const xlsxJson = require("./src/functions/xlsxConvert");

// hbs settings
const viewsPath = path.join(__dirname, "./templates/views");
app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(path.join(__dirname, "./public")));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// multer
const upload = multer({
  limits: 1000000,
  fileFilter(req, file, cb) {
    if (!file.originalname.endsWith(".xlsx")) {
      return cb(new Error("Only .xlsx files allowed"));
    }
    if (file.limits < 1000000) {
      return cb(new Error(".xlsx can not exceed 1mb "));
    }

    cb(null, true);
  },
});

////////////////////////////////////// Endpoints /

// Form page
app.get("/", (req, res) => {
  res.render("index", {
    company: "Fysiken",
  });
});

// page with statistics and graph
app.get("/stats", (req, res) => {
  res.render("results", {
    company: "Fysiken",
  });
  // setTimeout(() => {
  //   fs.unlinkSync(path.join(__dirname, "../src/uploaded.xlsx"));
  // }, 5000);
});

// Form post request endpoint, reads the .xlsx file
app.post(
  "/results",
  upload.single("filetoupload"),
  (req, res) => {
    fs.writeFileSync(
      path.join(__dirname, "./src", "uploaded.xlsx"),
      Buffer.from(req.file.buffer)
    );

    res.redirect("/stats");
  },
  (error, req, res, next) => {
    res.status(400).send({
      error: error.message,
    });
  }
);

// data for the front-end
app.get("/list", (req, res) => {
  const { statistics } = xlsxJson(path.join(__dirname, "./src/uploaded.xlsx"));

  res.send(statistics);
});

// Array of dates for graph
app.get("/dates", (req, res) => {
  const { datesArray } = xlsxJson(path.join(__dirname, "./src/uploaded.xlsx"));

  res.send(datesArray);
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running"));
