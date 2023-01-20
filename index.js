const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const Pusher = require("pusher");

app.use(express.json());

// Pusher Configuration
const pusher = new Pusher({
  appId: process.env.APP_ID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: process.env.CLUSTER,
  useTLS: true,
});

//importing database connnetion
const connection = require("./utils/db");
//DB connection
connection();

//importing routes
const roomRoute = require("./routes/room");
const messageRoute = require("./routes/message");

//Access Control Allow Origin
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/room", roomRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(process.env.PORT, () => {
  console.log(`Server Listening on ${process.env.PORT}`);
});
