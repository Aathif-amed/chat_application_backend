const router = require("express").Router();
const Message = require("../models/messagesModel");

router.post("/new", async (req, res) => {
  const dbMessage = req.body;
  Message.create(dbMessage, (error, data) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      return res.status(201).send(data);
    }
  });
});
router.get("/:id", async (req, res) => {
  Message.find({ roomId: req.params.id }, (error, data) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      return res.status(201).send(data);
    }
  });
});
module.exports = router;
