import mongoose from "mongoose";

const Language = new mongoose.Schema(
  {
    language: { type: String, required: true, unique: true },
    swap: { type: String, required: true },
    finance: { type: String, required: true },
    coin: { type: String, required: true },
    input: { type: String, required: true },
    token: { type: String, required: true },
    search: { type: String, required: true },
    explode: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    market: { type: String, required: true },
    volume: { type: String, required: true },
    supply: { type: String, required: true },
    24: { type: String, required: true },
    chart: { type: String, required: true },
    our: { type: String, required: true },
    community: { type: String, required: true },
    channels: { type: String, required: true },
    swaptc: { type: String, required: true },
    copyright: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Language", Language);