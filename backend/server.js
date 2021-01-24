const express = require("express");
const mongoose = require("mongoose");
const Messages = require("./dbMessagesSchema");
const Pusher = require("pusher");
const cors = require("cors");

//app config
const app = express();
const port = process.env.PORT || 9000;

//pusher

//middlewear
app.use(express.json());
app.use(cors());

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("change occured", change);

    if (change.operationType == "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error triggered Pusher");
    }
  });
});

//routes
app.get("/", (req, res) => res.status(200).send("Hello wordl"));

app.get("/messages/sync", (req, res) => {
  const dbMessage = req.body;

  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(port, async () => {
  await mongoose
    .connect(connection_db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(async () => {
      console.log("it works", port);
    });
});
