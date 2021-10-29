import dotenv from "dotenv";
import express from "express";
import path from "path";

dotenv.config();
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
	res.render("index");
});

app.listen(process.env.SERVER_PORT, () => { console.log(`Server started - listening at http://localhost:${process.env.SERVER_PORT}`); });