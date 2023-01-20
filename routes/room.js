const router = require("express").Router();
const Rooms = require("../models/roomModel");

router.get("/all", async (req, res) => {
  Rooms.find({}, (error, data) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      return res.status(201).send(data);
    }
  });
});
router.get("/:id", async (req, res) => {
  Rooms.find({ _id: req.params.id }, (error, data) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      return res.status(201).send(data[0]);
    }
  });
});
router.post("/create", async (req, res) => {
  Rooms.create({ name: req.body.roomName }, (error, data) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      return res.status(201).send(data);
    }
  });
});
module.exports = router;
