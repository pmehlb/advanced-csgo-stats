const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const os = require("os");
const formidable = require("formidable");
const bodyParser = require("body-parser");

const routeManager = require("./router");

const app = express();

dotenv.config();

app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", routeManager);
app.use("/api", routeManager);

app.listen(process.env.SERVER_PORT, () => { console.log(`Server started - listening at http://localhost:${process.env.SERVER_PORT}`); });