const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(express.json());
app.use(cors(corsOptions));

const { initializeDatabase } = require("./db/db.connect");

const Event = require("./models/event.models");

initializeDatabase();

const createEvent = async (newEvent) => {
  try {
    const event = new Event(newEvent);
    const saveEvent = await event.save();
    return saveEvent;
  } catch (error) {
    throw error;
  }
};
app.post("/events", async (req, res) => {
  try {
    const savedEvent = await createEvent(req.body);
    console.log(savedEvent);
    res
      .status(201)
      .json({ message: "Event Added Successfully.", event: savedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3005;
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
