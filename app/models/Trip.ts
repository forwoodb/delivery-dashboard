import mongoose from "mongoose";
import User from "./User";

const tripSchema = new mongoose.Schema({
  area: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
    ref: User,
  },
});

const Trip = mongoose.models.Trip || mongoose.model("Trip", tripSchema);
export default Trip;
