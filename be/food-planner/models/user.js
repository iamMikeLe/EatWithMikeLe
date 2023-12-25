import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  favorites: { type: [String], required: true },
  learned: { type: [String], required: true },
  // meals: [{ type: Schema.Types.ObjectId, ref: "Meal" }],
  createdAt: { type: String, required: true },
  modifiedAt: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
