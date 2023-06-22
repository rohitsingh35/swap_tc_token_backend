import mongoose from "mongoose";

const Message = new mongoose.Schema(
  {
    message: { type: String },
    date: { type: Date, require: true },
    toDate: { type: Date, require: true },
    role: { type: Number },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Messages", Message);
