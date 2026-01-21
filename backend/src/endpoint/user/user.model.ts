import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string;
  username: string;
  subscriptions: mongoose.Types.ObjectId[];
  pfpUrl?: string;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  subscriptions: [{ type: Schema.Types.ObjectId, ref: "User" }],
  pfpUrl: { type: String, required: false },
});

export default mongoose.model<IUser>("User", userSchema, "User");
