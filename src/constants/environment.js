import { config } from "dotenv";

config(".env");

export const {
  PORT,
  MONGO_URI,
  JWT_SECRET,
  COIN_MARKET_CAP_API_KEY,
  COIN_API_KEY,
  COIN_LAYER_API_KEY,
  LIVE_COIN_WATCH_API_KEY,
  REAL_TIME_DATA_IN_SECONDS
} = process.env;
