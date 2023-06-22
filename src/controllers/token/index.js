import { Token } from "../../models/index.js";
import { COIN_CAP_API_TABLE } from "../../services/coincap.js";
import { COIN_LAYER_TABLE } from "../../services/coinlayer.js";
import { COIN_MARKET_CAP_PRO_TABLE } from "../../services/coinMarketCap.js";
import { LIVE_COIN_WATCH_TABLE } from "../../services/livecoinwatch.js";
import { NOMICS_TABLE } from "../../services/nomics.js";
import { ETH_PLORER } from "../../utils/axios.js";
import Language from "../../models/addLanguage/index.js"
import SponserToken from "../../models/sponserToken/index.js";

export const TableListing = async () => {
  const tokens = await Token.find({}, { _id: 0, symbol: 1 });
  const coinListing = [];
  for (const [key, value] of Object.entries(tokens)) {
    coinListing.push(await NOMICS_TABLE(key, value));
    // coinListing.push(await COIN_CAP_API_TABLE(key,value))
    // coinListing.push(await LIVE_COIN_WATCH_TABLE(key,value))
    // coinListing.push(await COIN_LAYER_TABLE(key,value));
    // coinListing.push(await COIN_CAP_API_TABLE(key,value))
    // coinListing.push(await COIN_MARKET_CAP_PRO_TABLE(key,value))
  }
  return coinListing;
}

export const getTokensList = async (req, res, next) => {
  try {
    return res.status(200).json(await TableListing())
  } catch (error) {
    return res.status(500).json({ error: error?.message });
  }
};

export const searchToken = async (req, res, next) => {
  const { search } = req.query;
  try {
    const { data } = await ETH_PLORER.get(
      `/service/service.php?search=${search}`
    );
    const tokens = [];
    for (const iterator of data.results) {
      tokens.push({
        name: iterator[0],
        symbol: iterator[1],
        addres: iterator[2]
      })
    }
    return res.status(200).json(tokens)
  } catch (error) {
    return res.status(500).json({ error: error?.message });
  }
};
export const getAllLanguage = async (req, res) => {
  try {
    const result = await Language.find();
    if (!result) {
      return res.status(200).json({
        message: "Data not found",
        status: 404,
      });
    } else {
      return res.status(200).json({
        message: "Data get successfully",
        status: 200,
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const selectLanguage = async (req, res) => {
  try {
    const response = await Language.findOne({ language: req._parsedUrl.query });
    return res.status(200).send({
      status: 200,
      message: " Get Data Successfully",
      data: response,
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try again later!",
      error: err.message,
    });
  }
};

export const randomSponseredToken = async (req, res) => {
  try {
    return res.status(200).json(await SponserToken.aggregate([{ $sample: { size: 1 } }]))
  } catch (error) {
    return res.status(500).json({ error: error?.message });
  }
}