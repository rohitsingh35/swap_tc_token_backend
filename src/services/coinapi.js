import { COIN_API, NOMICS } from "../utils/axios";

export const COIN_API_TABLE = async (key, value) => {
    const symbolInfoCoinApi = await COIN_API.get(`/v1/assets/${value.symbol}`);
    const symbolInfo = await NOMICS.get(`/data/currencies-ticker?interval=1d&quote-currency=USD&symbols=${value.symbol}`)
    const graph = await NOMICS.get(`/data/currency-history?base=${value.symbol}&convert=USD&interval=7d`)
    const percentageInfo = await NOMICS.get(`/data/currency-highlights?currency=${value.symbol}&interval=1d&quote-currency=USD`)
    return {
        id: +key + 1,
        name: symbolInfoCoinApi?.data[0]?.name,
        price: symbolInfoCoinApi?.data[0]?.price_usd,
        percentagePerDay: percentageInfo?.data?.interval_data["1d"]?.price_change_pct,
        percentagePerWeek: percentageInfo?.data?.interval_data["7d"]?.price_change_pct,
        percentagePerMonth: percentageInfo?.data?.interval_data["30d"]?.price_change_pct,
        marketCap: symbolInfo?.data?.items[0]?.market_cap,
        volume: symbolInfoCoinApi?.data[0]?.volume_1day_usd,
        circulating: symbolInfo?.data?.circulatingSupply,
        last7daysGraph: graph?.data?.items?.map((item) => item?.open),
        symbol: value?.symbol,
    }
}