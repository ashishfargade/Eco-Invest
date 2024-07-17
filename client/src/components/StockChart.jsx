import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const StockChart = ({ symbol }) => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=0RL0C2RR4YR7NS1T`);
        const data = await response.json();

        if (!data['Time Series (Daily)']) {
          setError('Failed to fetch data.');
          return;
        }

        const timeSeries = data['Time Series (Daily)'];
        const dates = Object.keys(timeSeries).reverse();
        const highs = dates.map(date => parseFloat(timeSeries[date]['2. high']));

        setChartData({
          labels: dates,
          datasets: [
            {
              label: `${symbol} Daily Highs`,
              data: highs,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.1
            }
          ]
        });
        setError(null); // Clear any previous errors
      } catch (error) {
        setError('Error fetching data.');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [symbol]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>{symbol} Daily Highs</h2>
      {chartData ? <Line data={chartData} /> : <div>Loading...</div>}
    </div>
  );
};

export default StockChart;
