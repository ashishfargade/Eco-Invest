import mongoose from "mongoose";

const UserStockSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    valueAtPurchase: {
        type: Number,
        required: true
    },
    currentValue: {
        type: Number,
    },
    dateBought: {
        type: Date,
        default: Date.now
    }
});

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    ownedStocks: [UserStockSchema],
    intrestStocks: [UserStockSchema]
})

const User = mongoose.model('UserSchema', UserSchema);
export default User;