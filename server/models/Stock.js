import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true,
        unique: true,
    },
    companyName: {
        type: String,
        required: true,
    },
});

const Stock = mongoose.model('Stock', StockSchema);
export default Stock;