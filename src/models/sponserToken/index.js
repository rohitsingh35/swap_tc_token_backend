import mongoose from "mongoose";

const SponseredToken = new mongoose.Schema(
  {
    address: { type: String, required: true, unique: true },
    symbol: { type: String, require: true, unique: true },
    name: { type: String, require: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SponseredToken", SponseredToken);
