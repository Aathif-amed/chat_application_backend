const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");

//importing database connnetion

const connection = require("./utils/db");

//importing routes
const roomRoute = require("./routes/room");

app.use(express.json());
app.use("/api/room", roomRoute);

//DB connection
connection();

//Access Control Allow Origin
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(process.env.PORT, () => {
  console.log(`Server Listening on ${process.env.PORT}`);
});
