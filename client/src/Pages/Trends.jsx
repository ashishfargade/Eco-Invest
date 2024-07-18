

// export default Trends;
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Trends = () => {
  const [symbols, setSymbols] = useState([]);
  const [inputSymbol, setInputSymbol] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        
        const allData = await Promise.all(symbols.map(async (symbol) => {
          const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=0RL0C2RR4YR7NS1T`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          
          const data = await response.json();
          
          if (data['Time Series (Daily)']) {
            const timeSeries = data['Time Series (Daily)'];
            let dates = Object.keys(timeSeries).reverse();
            
            // Filter dates based on selected start and end date
            if (startDate && endDate) {
              dates = dates.filter(date => date >= startDate && date <= endDate);
            }
            
            const highs = dates.map(date => parseFloat(timeSeries[date]['2. high']));
            return { symbol, dates, highs };
          } else if (data['Error Message']) {
            throw new Error(data['Error Message']);
          } else {
            throw new Error(`No data available for the symbol: ${symbol}`);
          }
        }));
        
        const commonDates = allData[0]?.dates || [];
        const colors = [
          '#FF5733', '#33FF57', '#5733FF', '#33FFFF', '#FF33F6', '#FF5733', '#33FF57', '#5733FF', '#33FFFF', '#FF33F6', 
          '#FF5733', '#33FF57', '#5733FF', '#33FFFF', '#FF33F6', '#FF5733', '#33FF57', '#5733FF', '#33FFFF', '#FF33F6', 
          '#FF5733', '#33FF57', '#5733FF', '#33FFFF', '#FF33F6', '#FF5733', '#33FF57', '#5733FF', '#33FFFF', '#FF33F6'
        ];

        const datasets = allData.map(({ symbol, highs }, index) => ({
          label: `${symbol} Daily Highs`,
          data: highs,
          backgroundColor: colors[index % colors.length],
          borderColor: colors[index % colors.length],
          borderWidth: 1,
          hoverBackgroundColor: colors[index % colors.length],
          hoverBorderColor: colors[index % colors.length],
        }));
        
        setChartData({
          labels: commonDates,
          datasets,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbols, startDate, endDate]);

  const handleInputChange = (event) => {
    setInputSymbol(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSymbols((prevSymbols) => [...prevSymbols, inputSymbol.toUpperCase()]);
    setInputSymbol('');
  };

  return (
    <div className="App min-h-screen flex flex-col justify-center items-center">
      <header className="bg-green-600 text-white p-4 text-center w-full">
        <h1 className="text-3xl">Stock Highs Tracker</h1>
      </header>
      <main className="p-4 w-full max-w-screen-lg mx-auto">
        <form onSubmit={handleFormSubmit} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="symbol">
            Enter Stock Symbol:
          </label>
          <div className="flex">
            <input
              type="text"
              id="symbol"
              value={inputSymbol}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Add Stock Symbol
            </button>
          </div>
        </form>
        <div className="p-4 bg-white rounded-lg shadow-lg w-full">
          <h2 className="text-2xl font-bold text-center mb-4">Daily Highs</h2>
          <form className="mb-4">
            <div className="flex items-center mb-2">
              <label className="block text-gray-700 text-sm font-bold mr-2" htmlFor="startDate">
                Start Date:
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={handleStartDateChange}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center">
              <label className="block text-gray-700 text-sm font-bold mr-2" htmlFor="endDate">
                End Date:
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={handleEndDateChange}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </form>
          {loading && <p className="text-center my-4">Loading...</p>}
          {error && <p className="text-red-500 text-center my-4">{error}</p>}
          {!loading && !error && (
            <div className="mt-4">
              <Bar data={chartData} options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Stock Daily Highs',
                    fontSize: 16,
                  },
                },
              }} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Trends;
