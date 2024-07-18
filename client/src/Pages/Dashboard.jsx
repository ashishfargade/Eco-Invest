import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../authSlice';
import StockChart from '../components/StockChart';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedStock, setSelectedStock] = useState('IBM');
  const [bgColor, setBgColor] = useState('bg-black-500');
  const [performance, setPerformance] = useState({ change: 0, amount: 0, trend: 'neutral' });
  const [recommendations, setRecommendations] = useState([]);

  const handleLogout = () => {
    dispatch(logout()); // Clear the authentication state
    navigate('/login'); // Redirect to the login page
  };

  const stocks = [
    { name: 'IBM', symbol: 'IBM', color: 'bg-gray-800', volume: 250000},
    { name: 'Microsoft', symbol: 'MSFT', color: 'bg-gray-800', volume: 300000},
    { name: 'Google', symbol: 'GOOGL', color: 'bg-gray-800', volume: 150000},
    { name: 'Nvidia', symbol: 'NVDA', color: 'bg-gray-800', volume: 100000},
    { name: 'Meta', symbol: 'META', color: 'bg-gray-800', volume: 200000},
    { name: 'AMD', symbol: 'AMD', color: 'bg-gray-800', volume: 175000},
    { name: 'Micron', symbol: 'MU', color: 'bg-gray-800', volume: 80000},
    { name: 'Crowd', symbol: 'CRWD', color: 'bg-gray-800', volume: 90000},
  ];

  useEffect(() => {
    const calculateESGValue = () => {
      const totalESGValue = stocks.reduce((acc, stock) => acc + stock.total_esg_value, 0);
      return totalESGValue / stocks.length;
    };

    const totalESGValue = calculateESGValue();

    if (totalESGValue >= 80) {
      setBgColor('bg-green-400');
    } else if (totalESGValue >= 40) {
      setBgColor('bg-yellow-100');
    } else {
      setBgColor('bg-red-100');
    }

    // Fetch ESG recommendations
    fetchRecommendations();

  }, [stocks]);

  const fetchRecommendations = async () => {
    try {
      const response = await fetch('/api/esg-recommendations');
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching ESG recommendations:', error);
    }
  };

  const handleStockClick = (symbol) => {
    setSelectedStock(symbol);
  };

  const updatePerformance = async (symbol) => {
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=0RL0C2RR4YR7NS1T`);
      const data = await response.json();
      const timeSeries = data['Time Series (Daily)'];
      const dates = Object.keys(timeSeries).reverse();
      const latest = timeSeries[dates[0]];
      const previous = timeSeries[dates[1]];

      const change = ((parseFloat(latest['4. close']) - parseFloat(previous['4. close'])) / parseFloat(previous['4. close'])) * 100;
      const amount = parseFloat(latest['4. close']) - parseFloat(previous['4. close']);
      const trend = change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';

      setPerformance({ change, amount, trend });
    } catch (error) {
      console.error('Error fetching performance data:', error);
    }
  };

  const getBoxSize = (volume) => {
    const maxVolume = Math.max(...stocks.map(stock => stock.volume));
    return `h-${Math.floor((volume / maxVolume) * 20) + 10} w-${Math.floor((volume / maxVolume) * 20) + 10}`;
  };

  const handleAddPotentialStock = () => {
    if (newStock && !potentialStocks.includes(newStock)) {
      setPotentialStocks([...potentialStocks, newStock]);
      setNewStock('');
    }
  };

  const handleSubmitPotentialStocks = async () => {
    console.log('Token:', token);
    const formattedStocks = potentialStocks.map(stock => ({
      "ticker": stock.toUpperCase()
    }));
    console.log(formattedStocks);
  
    try {
      const response = await fetch('http://localhost:8000/api/userStock/interestStocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ "stocks": formattedStocks }),
      });
  
      const data = await response.json();
      console.log('Submitted potential stocks:', data);
  
      // Optionally handle response or navigate to another page
    } catch (error) {
      console.error('Error submitting potential stocks:', error);
    }
  };
  

  return (
    <div className="flex h-screen p-4 bg-white">
      <div className="w-3/5 p-4">
        <h1 className="text-3xl font-semibold mb-4">Evaluation</h1>
        <div className={`text-5xl font-bold ${performance.trend === 'negative' ? 'text-red-600' : ''}`}>
          $49,825.82{' '}
          <span className={`text-${performance.trend === 'positive' ? 'green' : performance.trend === 'negative' ? 'red' : 'gray'}-600 text-xl`}>
            {performance.trend === 'positive' ? '▲' : performance.trend === 'negative' ? '▼' : ''}
            {performance.change.toFixed(2)}% ${performance.amount.toFixed(2)}
          </span>
        </div>
        <div className="text-gray-600">
          {performance.trend === 'positive'
            ? 'Strong performance 💪'
            : performance.trend === 'negative'
            ? 'Needs Improvement 😟'
            : 'Neutral Performance 😐'}
        </div>
        <div className="mt-6">
          {selectedStock && <StockChart symbol={selectedStock} />}
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Potential Stocks</h2>
          <div className="mb-2">
            <input
              type="text"
              value={newStock}
              onChange={e => setNewStock(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter stock name"
            />
            <button
              onClick={handleAddPotentialStock}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Stock
            </button>
          </div>
          <ul className="flex flex-wrap">
            {potentialStocks.map((stock, index) => (
              <li key={index} className="p-2 bg-gray-200 rounded-lg m-1">
                {stock}
              </li>
            ))}
          </ul>

          <button
            onClick={handleSubmitPotentialStocks}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Submit Potential Stocks
          </button>
        </div>
      </div>

      <div className={`w-2/5 p-4 rounded-lg ${bgColor}`}>
        <h2 className="text-xl font-semibold mb-4">Allocation</h2>
        <div className="grid grid-cols-2 gap-4">
          {stocks.map(stock => (
            <div
              key={stock.symbol}
              className={`p-4 ${selectedStock === stock.symbol ? 'bg-blue-600' : stock.color} rounded-lg text-white flex flex-col items-center cursor-pointer ${getBoxSize(stock.volume)}`}
              onClick={() => handleStockClick(stock.symbol)}
            >
              <div className="flex items-center">
                <span className="text-xl font-semibold">{stock.name}</span>
                <span className="ml-2 text-sm">{stock.symbol}</span>
              </div>
              <div className="text-lg font-semibold mt-2">{stock.volume.toLocaleString()}</div>
              <div className="text-sm mt-1">{stock.total_ESG_grade}</div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded absolute top-4 right-4"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
