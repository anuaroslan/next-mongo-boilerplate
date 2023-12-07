import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  image: String,
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  description: {
    type: String,
  },
  difficulty: {
    type: Number,
  },
  location: {
    type: String,
  },
  date: {
    type: Date,
  },
  createdBy: {
    type: String,
    required: true,
  },
  attendees: [String],
  isActive: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

const Event = mongoose.models.events || mongoose.model("events", eventSchema);

export default Event;
