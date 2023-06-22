import mongoose from "mongoose";
import { MONGO_URI } from "./environment.js";

export const connectDb = () => {
  return mongoose.connect(MONGO_URI, {}, (error) => {
    if (error) return console.log("Error", error);
    return console.log("Database connected successfully");
  });
};
