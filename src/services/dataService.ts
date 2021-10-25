import Axios from "../utils/Axios";
import { AxiosResponse } from "axios";
import { CurrentPrice } from "../models/currentprice";
import { HistoricData } from "../models/historicdata";

/**
 * Gets the previous bitcoin prices of last 31 days
 * @function getHistoricData
 * @param {string} currency Currency code
 */
export const getHistoricData = async (
  currency: string
): Promise<HistoricData | any> => {
  try {
    const response: AxiosResponse<HistoricData> = await Axios.get<HistoricData>(
      `/historical/close.json?currency=${currency}`
    );
    return response.data;
  } catch (err: any) {
    throw new Error(
      `A ${err.message} occured while fetching historical prices`
    );
  }
}

/**
 * Gets the current bitcoin prices
 * @function getCurrentPrice
 * @param {string} currency Currency code
 */
export const getCurrentPrice = async (
  currency: string
): Promise<CurrentPrice | any> => {
  try {
    const response: AxiosResponse<CurrentPrice> = await Axios.get<CurrentPrice>(
      `/currentprice/${currency}.json`
    );
    return response.data;
  } catch (err: any) {
    throw new Error(
      `A ${err.message} occured while fetching current price in ${currency}`
    );
  }
};
