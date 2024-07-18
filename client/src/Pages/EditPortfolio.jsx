import React, { useState } from 'react';

const EditPortfolio = () => {
  const [portfolio, setPortfolio] = useState([
    { id: 1, name: 'IBM', ticker: 'IBM', volume: 100, dateBought: '2023-01-10' },
    { id: 2, name: 'Microsoft', ticker: 'MSFT', volume: 50, dateBought: '2023-02-15' },
  ]);

  const handleInputChange = (id, field, value) => {
    setPortfolio(
      portfolio.map((stock) => (stock.id === id ? { ...stock, [field]: value } : stock))
    );
  };

  const handleSaveChanges = () => {
    console.log('Saved changes:', portfolio);
  };

  return (
    <div className="flex h-screen p-4 bg-gray-50 text-sm">
      <div className="w-full p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-blue-600">Edit Portfolio</h2>
        {portfolio.map((stock) => (
          <div key={stock.id} className="mb-4">
            <h3 className="text-md font-semibold mb-2">{stock.name}</h3>
            <label className="block text-gray-700">Ticker</label>
            <input
              type="text"
              value={stock.ticker}
              onChange={(e) => handleInputChange(stock.id, 'ticker', e.target.value)}
              className="w-full px-3 py-2 mb-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <label className="block text-gray-700">Volume</label>
            <input
              type="number"
              value={stock.volume}
              onChange={(e) => handleInputChange(stock.id, 'volume', e.target.value)}
              className="w-full px-3 py-2 mb-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <label className="block text-gray-700">Date Bought</label>
            <input
              type="date"
              value={stock.dateBought}
              onChange={(e) => handleInputChange(stock.id, 'dateBought', e.target.value)}
              className="w-full px-3 py-2 mb-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}
        <button
          onClick={handleSaveChanges}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditPortfolio;
