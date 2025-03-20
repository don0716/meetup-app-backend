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

const Event = require("./models/event.model");

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

const readAllEvents = async () => {
  try {
    const events = await Event.find();
    return events;
  } catch (error) {
    console.log(error);
  }
};

app.get("/events", async (req, res) => {
  try {
    const events = await readAllEvents();
    if (events.length != 0) {
      res.json(events);
    } else {
      res.status(401).json({ error: "No Events Found!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3005;
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
