import mongoose, { Schema } from "mongoose";

const destinationSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  country: { type: String, required: true },
  imageUrl: { type: String, required: true },
  budget: { type: Number, required: true },
  isVisited: { type: Boolean, default: false },
  cities: [{ type: String }],
});

export default mongoose.model("Destination", destinationSchema, "Destination");
