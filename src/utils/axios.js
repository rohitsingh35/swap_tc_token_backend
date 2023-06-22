import axios from "axios";
import { ENDPOINTS } from "../constants/index.js";
import {
  COIN_MARKET_CAP_API_KEY,
  COIN_API_KEY,
  LIVE_COIN_WATCH_API_KEY,
} from "../constants/environment.js";

export const ETH_PLORER = axios.create({
  baseURL: ENDPOINTS.ETH_PLORER,
});

export const COIN_MARKET_CAP_PRO = axios.create({
  baseURL: ENDPOINTS.COIN_MARKET_CAP_PRO,
  headers: { "X-CMC_PRO_API_KEY": COIN_MARKET_CAP_API_KEY },
});

export const NOMICS = axios.create({
  baseURL: ENDPOINTS.NOMICS_API_KEY,
  headers: {
    'User-Agent': "PostmanRuntime/7.29.2"
  }
});

export const COIN_GECKO = axios.create({
  baseURL: ENDPOINTS.COIN_GECKO,
});

export const COIN_API = axios.create({
  baseURL: ENDPOINTS.COIN_API,
  headers: { "X-CoinAPI-Key": COIN_API_KEY },
});

export const COIN_CAP = axios.create({
  baseURL: ENDPOINTS.COIN_CAP,
})

export const COIN_LAYER = axios.create({
  baseURL: ENDPOINTS.COIN_LAYER,
});

export const LIVE_COIN_WATCH = axios.create({
  baseURL: ENDPOINTS.LIVE_COIN_WATCH,
  headers: { "x-api-key": LIVE_COIN_WATCH_API_KEY },
});
