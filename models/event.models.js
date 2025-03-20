const mongoose = require("mongoose");

const EventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    hostedBy: {
      type: String,
      default: "Marketing Experts",
    },
    eventType: {
      type: String,
      enum: ["Online", "Offline", "Both"],
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    eventTopic: {
      type: String,
      required: true,
    },
    sessionTimings: {
      type: String,
      required: true,
    },
    speakers: [
      {
        name: { type: String, required: true },
        role: { type: String, required: true },
      },
    ],
    pricing: {
      type: Number,
      default: 0,
    },
    venue: {
      type: String,
    },
    address: {
      type: String,
    },
    dressCode: {
      type: String,
    },
    isAgeRestricted: {
      type: Boolean,
      default: true,
    },
    eventTags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
