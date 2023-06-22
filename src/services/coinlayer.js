import { COIN_LAYER_API_KEY } from "../constants/environment.js";
import { COIN_LAYER, NOMICS } from "../utils/axios.js";

export const COIN_LAYER_TABLE = async (key, value) => {
    const symbolInfo = await COIN_LAYER.get(`/live?access_key=${COIN_LAYER_API_KEY}&symbols=${value.symbol}&expand=1`);
    const symbolList = await COIN_LAYER.get(`/list?access_key=${COIN_LAYER_API_KEY}`);
    const graph = await NOMICS.get(`/data/currency-history?base=${value.symbol}&convert=USD&interval=7d`)
    const percentageInfo = await NOMICS.get(`/data/currency-highlights?currency=${value.symbol}&interval=1d&quote-currency=USD`)
    return {
        id: +key + 1,
        name: symbolList?.data?.crypto[value?.symbol]?.name,
        price: symbolInfo?.data?.rates[value?.symbol]?.rate,
        percentagePerDay: percentageInfo?.data?.interval_data["1d"]?.price_change_pct,
        percentagePerWeek: percentageInfo?.data?.interval_data["7d"]?.price_change_pct,
        percentagePerMonth: percentageInfo?.data?.interval_data["30d"]?.price_change_pct,
        marketCap: symbolInfo?.data?.rates[value?.symbol]?.cap,
        volume: symbolInfo?.data?.rates[value?.symbol].vol,
        circulating: symbolList?.data?.crypto[value?.symbol]?.max_supply,
        last7daysGraph: graph?.data?.items?.map((item) => item?.open),
        symbol: value?.symbol
    };
}