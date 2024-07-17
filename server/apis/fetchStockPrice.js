import axios from "axios";

import { polygonio_key } from "../config.js";

export const getStockPrice = async (ticker, date) => {
    // Ensure the date is a valid Date object and convert it to the YYYY-MM-DD format
    const dateString = new Date(date).toISOString().split('T')[0];
    let capTicker = ticker.toUpperCase();
    const url = `https://api.polygon.io/v2/aggs/ticker/${capTicker}/range/1/day/${dateString}/${dateString}?apiKey=${polygonio_key}`;

    try {
        console.log(`Fetching data from URL: ${url}`); // Debugging line
        const response = await axios.get(url);
        const data = response.data;

        if (data.results && data.results.length > 0) {
            const highestPrice = data.results[0].h;
            return highestPrice;
        } else {
            console.error('No data available for the given date:', data); // Debugging line
            throw new Error('No data available for the given date.');
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};
