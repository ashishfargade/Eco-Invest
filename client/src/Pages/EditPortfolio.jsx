// import React, { useState } from 'react';
// import axios from 'axios';

// const EditPortfolio = () => {
//   const initialPortfolio = [
//     { id: 1, name: 'IBM', ticker: 'IBM', volume: 100, dateBought: '2023-01-10' },
//     { id: 2, name: 'Microsoft', ticker: 'MSFT', volume: 50, dateBought: '2023-02-15' },
//   ];

//   const [portfolio, setPortfolio] = useState(initialPortfolio);
//   const [editMode, setEditMode] = useState(false); // Track if in edit mode
//   const [selectedStock, setSelectedStock] = useState(null); // Track selected stock

//   const handleEditStock = (stock) => {
//     setSelectedStock(stock);
//     setEditMode(true); // Enter edit mode
//   };

//   const handleInputChange = (field, value) => {
//     setSelectedStock({
//       ...selectedStock,
//       [field]: value
//     });
//   };

//   const handleSaveChanges = async () => {
//     try {
//       const response = await axios.put('/api/userownedstock', selectedStock);
//       console.log('Saved changes:', response.data);

//       // Update the portfolio state with the edited stock
//       const updatedPortfolio = portfolio.map(stock =>
//         stock.id === selectedStock.id ? selectedStock : stock
//       );
//       setPortfolio(updatedPortfolio);

//       setEditMode(false); // Exit edit mode after saving changes
//       setSelectedStock(null); // Clear selected stock
//     } catch (error) {
//       console.error('Error saving changes:', error);
//       // Handle error gracefully (e.g., show error message to user)
//     }
//   };

//   return (
//     <div className="flex h-screen p-4 bg-gray-50 text-sm">
//       <div className="w-full p-4 bg-white rounded-lg shadow-lg">
//         <h2 className="text-lg font-semibold mb-4 text-blue-600">Edit Portfolio</h2>
//         {portfolio.map((stock) => (
//           <div key={stock.id} className="mb-4">
//             <h3 className="text-md font-semibold mb-2">{stock.name}</h3>
//             <label className="block text-gray-700">Ticker</label>
//             <input
//               type="text"
//               value={editMode && selectedStock.id === stock.id ? selectedStock.ticker : stock.ticker}
//               onChange={(e) => handleInputChange('ticker', e.target.value)}
//               className="w-full px-3 py-2 mb-2 border rounded-lg focus:outline-none focus:border-blue-500"
//               disabled={!editMode || selectedStock.id !== stock.id}
//             />
//             <label className="block text-gray-700">Volume</label>
//             <input
//               type="number"
//               value={editMode && selectedStock.id === stock.id ? selectedStock.volume : stock.volume}
//               onChange={(e) => handleInputChange('volume', e.target.value)}
//               className="w-full px-3 py-2 mb-2 border rounded-lg focus:outline-none focus:border-blue-500"
//               disabled={!editMode || selectedStock.id !== stock.id}
//             />
//             {editMode && selectedStock.id === stock.id && (
//               <button
//                 onClick={handleSaveChanges}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mr-2"
//               >
//                 Save Changes
//               </button>
//             )}
//             {!editMode && (
//               <button
//                 onClick={() => handleEditStock(stock)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mr-2"
//               >
//                 Edit Selected Stock
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EditPortfolio;
