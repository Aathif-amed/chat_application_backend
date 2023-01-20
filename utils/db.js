const mongoose = require("mongoose");
const Pusher = require("pusher");
const db = mongoose.connection;
const pusher = new Pusher({
  appId: process.env.APP_ID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: process.env.CLUSTER,
  useTLS: true,
});

module.exports = connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅DB Connection Succesfull..!");
  } catch (error) {
    console.log("❌DB Connection Failed..!");
    console.log(error);
  }
};

db.once("open", () => {
  console.log("✅DB Connection Open..!");

  const roomCollection = db.collection("rooms");
  const changeRoomStream = roomCollection.watch();

  changeRoomStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const roomDetails = change.fullDocument;
      pusher.trigger("rooms", "inserted", roomDetails);
    } else {
      console.log("Not an expected event");
    }
  });
  const messageCollection = db.collection("messages");
  const changeMsgStream = messageCollection.watch();

  changeMsgStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", messageDetails);
    } else {
      console.log("Not an expected event");
    }
  });
});
