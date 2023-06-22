import { COIN_CAP, NOMICS } from "../utils/axios.js";

export const COIN_CAP_API_TABLE = async (key,value) => {
    const symbolInfo = await COIN_CAP.get(`/v2/assets?search=${value.symbol}`);
    const graph = await NOMICS.get(`/data/currency-history?base=${value.symbol}&convert=USD&interval=7d`)
    const percentageInfo = await NOMICS.get(`/data/currency-highlights?currency=${value.symbol}&interval=1d&quote-currency=USD`)
    return {
        id: +key + 1,
        name: symbolInfo?.data?.data[0]?.name,
        price: symbolInfo?.data?.data[0]?.priceUsd,
        percentagePerDay: percentageInfo?.data?.interval_data["1d"]?.price_change_pct,
        percentagePerWeek: percentageInfo?.data?.interval_data["7d"]?.price_change_pct,
        percentagePerMonth: percentageInfo?.data?.interval_data["30d"]?.price_change_pct,
        marketCap: symbolInfo?.data?.data[0]?.marketCapUsd,
        volume: symbolInfo?.data?.data[0]?.volumeUsd24Hr,
        circulating: symbolInfo?.data?.data[0]?.maxSupply,
        last7daysGraph: graph?.data?.items?.map((item) => item?.open),
        symbol: symbolInfo?.data?.data[0]?.symbol,
    };
}
