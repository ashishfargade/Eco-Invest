import mongoose from "mongoose";

const UserStockSchema = new mongoose.Schema({
    ticker: {
        type: mongoose.Schema.Types.String,
        ref: 'stockSchema',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    volume: {
        type: Number,
        required: true
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