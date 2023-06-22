import { LIVE_COIN_WATCH } from "../utils/axios.js"

export const LIVE_COIN_WATCH_TABLE = async (key, value) => {
    const symbolInfo = await LIVE_COIN_WATCH.post(`/coins/single`, {
        "currency": "USD",
        "code": value.symbol,
        "meta": true
    })
    const graph = await LIVE_COIN_WATCH.post(`/coins/single/history`, {
        "currency": "USD",
        "code": value.symbol,
        "start": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getTime(),
        "end": new Date().getTime()
    })
    return {
        id: +key + 1,
        name: symbolInfo?.data?.name,
        price: symbolInfo?.data?.rate,
        percentagePerDay: symbolInfo?.data?.delta?.day,
        percentagePerWeek: symbolInfo?.data?.delta?.week,
        percentagePerMonth: symbolInfo?.data?.delta?.month,
        marketCap: symbolInfo?.data?.cap,
        volume: symbolInfo?.data?.volume,
        circulating: symbolInfo?.data?.circulatingSupply,
        last7daysGraph: graph?.data?.history?.map(item => item?.rate),
        symbol: value?.symbol,
    }
}