import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

const Portfolio = () => {
  const [stocks, setStocks] = useState([
    { id: 1, name: 'IBM', ticker: 'IBM', price: 145, volume: 100, dateBought: '2023-01-10', currentPrice: 150 },
    { id: 2, name: 'Microsoft', ticker: 'MSFT', price: 300, volume: 50, dateBought: '2023-02-15', currentPrice: 320 },
  ]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newStock, setNewStock] = useState({ name: '', ticker: '', volume: '' });

  const handleStockClick = (stock) => {
    setSelectedStock(stock);
    setIsAdding(false);
  };

  const handleAddNewStock = () => {
    setSelectedStock(null);
    setIsAdding(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStock({ ...newStock, [name]: value });
  };

  const handleSaveNewStock = async () => {
    try {
      // Make a PUT request to your backend endpoint
      const response = await axios.put('/userownedstock', newStock);
      const updatedStocks = response.data; // Assuming the backend returns updated list of stocks
      setStocks(updatedStocks);
      setNewStock({ name: '', ticker: '', volume: '' }); // Clear input fields after successful save
      setIsAdding(false); // Hide the add new stock form
    } catch (error) {
      console.error('Error saving new stock:', error);
      // Handle error appropriately, e.g., show error message to user
    }
  };

  const calculatePrice = (price, volume) => (price * volume).toFixed(2);

  return (
    <div className="flex h-screen p-4 bg-gray-50 text-sm">
      <div className="w-2/5 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-blue-600">List of Owned Stocks</h2>
        <ul>
          {stocks.map(stock => (
            <li
              key={stock.id}
              className={`p-2 cursor-pointer rounded-lg mb-2 hover:bg-blue-100 ${selectedStock && selectedStock.id === stock.id ? 'bg-blue-200' : ''}`}
              onClick={() => handleStockClick(stock)}
            >
              {stock.name}
            </li>
          ))}
        </ul>
        <button
          onClick={handleAddNewStock}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Add New Stock
        </button>
      </div>
      <div className="w-3/5 p-4 bg-white rounded-lg shadow-lg ml-4">
        {isAdding ? (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-blue-600">Add New Stock</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Stock Name</label>
                <input
                  type="text"
                  name="name"
                  value={newStock.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Ticker</label>
                <input
                  type="text"
                  name="ticker"
                  value={newStock.ticker}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Volume</label>
                <input
                  type="number"
                  name="volume"
                  value={newStock.volume}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={handleSaveNewStock}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            </form>
          </div>
        ) : selectedStock ? (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-blue-600">{selectedStock.name} Details</h2>
            <p><strong>Stock Title:</strong> {selectedStock.name}</p>
            <p><strong>Ticker:</strong> {selectedStock.ticker}</p>
            <p><strong>Volume:</strong> {selectedStock.volume}</p>
            <p><strong>Date Bought:</strong> {selectedStock.dateBought}</p>
            <p><strong>Current Price:</strong> ${selectedStock.currentPrice}</p>
            <p><strong>Buy Price:</strong> ${calculatePrice(selectedStock.price, selectedStock.volume)}</p>
            <p><strong>Current Value:</strong> ${calculatePrice(selectedStock.currentPrice, selectedStock.volume)}</p>
            <button
              onClick={() => alert('Edit functionality to be implemented')}
              className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
            >
              Edit Selected Stock
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-blue-600">Select a Stock to View Details</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
