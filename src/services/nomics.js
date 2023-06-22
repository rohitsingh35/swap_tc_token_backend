import { NOMICS } from "../utils/axios.js";

export const NOMICS_SYMBOL_INFO = async (value) => await NOMICS.get(`/data/currencies-ticker?interval=1d&quote-currency=USD&symbols=${value.symbol}`);
export const NOMICS_GRAPH = async (value) => await NOMICS.get(`/data/currency-history?base=${value.symbol}&convert=USD&interval=7d`)
export const NOMICS_PERCENTAGE_INFO = async (value) => await NOMICS.get(`/data/currency-highlights?currency=${value.symbol}&interval=1d&quote-currency=USD`)

export const NOMICS_TABLE = async (key, value) => {
    const symbolInfo = await NOMICS_SYMBOL_INFO(value);
    const graph = await NOMICS_GRAPH(value);
    const percentageInfo = await NOMICS_PERCENTAGE_INFO(value);
    return {
        id: +key + 1,
        name: symbolInfo?.data?.items[0]?.name,
        price: symbolInfo?.data?.items[0]?.price,
        percentagePerDay: percentageInfo?.data?.interval_data["1d"]?.price_change_pct,
        percentagePerWeek: percentageInfo?.data?.interval_data["7d"]?.price_change_pct,
        percentagePerMonth: percentageInfo?.data?.interval_data["30d"]?.price_change_pct,
        marketCap: symbolInfo?.data?.items[0]?.market_cap,
        volume: symbolInfo?.data?.items[0]["1d"]?.volume,
        circulating: symbolInfo?.data?.items[0]?.circulating_supply,
        last7daysGraph: graph?.data?.items?.map((item) => item.open),
        symbol: symbolInfo?.data?.items[0]?.symbol,
    }
}

export const NOMICS_TABLE2 = async (value) => {
    const symbolInfo = await NOMICS_SYMBOL_INFO(value);
    const graph = await NOMICS_GRAPH(value);
    const percentageInfo = await NOMICS_PERCENTAGE_INFO(value);

    return {
        id: symbolInfo?.data.items[0]?.rank,
        name: symbolInfo?.data.items[0]?.name,
        price: symbolInfo?.data.items[0]?.price,
        percentagePerDay:
            percentageInfo?.data?.interval_data["1d"]?.price_change_pct,
        percentagePerWeek:
            percentageInfo?.data.interval_data["7d"]?.price_change_pct,
        percentagePerMonth:
            percentageInfo?.data?.interval_data["30d"]?.price_change_pct,
        marketCap: symbolInfo.data.items[0]?.market_cap,
        volume: symbolInfo?.data?.items[0]["1d"]?.volume,
        circulating: symbolInfo?.data?.items[0]?.circulating_supply,
        last7daysGraph: graph?.data?.items.map((item) => item.open),
        symbol: symbolInfo?.data?.items[0]?.symbol,
        tokenAdress: value.address,
    };
};
