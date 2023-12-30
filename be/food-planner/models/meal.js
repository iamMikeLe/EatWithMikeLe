import mongoose from "mongoose";

const Schema = mongoose.Schema;

const mealSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  tags: [{ type: String, required: false }],
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  createdAt: { type: String, required: true },
  modifiedAt: { type: String, required: true },
});

export default mongoose.model("Meal", mealSchema);
