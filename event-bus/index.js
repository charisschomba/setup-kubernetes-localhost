const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const volleyball = require('volleyball')

const app = express();
app.use(volleyball)
app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://post-cluster-srv:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://comments-cluster-srv:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://query-cluster-srv:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://moderation-cluster-srv:4003/events", event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
