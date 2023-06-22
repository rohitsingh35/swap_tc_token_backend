import { COIN_MARKET_CAP_PRO, NOMICS } from "../utils/axios.js";

export const COIN_MARKET_CAP_PRO_TABLE = async (key, value) => {
    const symbolInfo = await COIN_MARKET_CAP_PRO.get(`/v1/cryptocurrency/listings/latest`)
    const graph = await NOMICS.get(`/data/currency-history?base=${value.symbol}&convert=USD&interval=7d`)
    const tokenData = symbolInfo.data.data.find((item) => item.symbol === value.symbol);
    return {
        id: +key + 1,
        name: tokenData?.name,
        price: tokenData?.quote?.USD?.price,
        percentagePerDay: tokenData?.quote?.USD?.percent_change_24h,
        percentagePerWeek: tokenData?.quote?.USD?.percent_change_7d,
        percentagePerMonth: tokenData?.quote?.USD?.percent_change_30d,
        marketCap: tokenData?.quote?.USD?.market_cap,
        volume: tokenData?.quote?.USD?.volume_24h,
        circulating: tokenData?.circulating_supply,
        last7daysGraph: graph?.data?.items?.map((item) => item?.open),
        symbol: value?.symbol,
    }
}