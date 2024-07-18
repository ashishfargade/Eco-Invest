import { Router } from "express";
import { check, validationResult } from "express-validator";

import User from "../models/User.js";
import Stock from "../models/Stock.js";
import { auth } from "../middleware/auth.js";
import { getStockPrice } from "../apis/fetchStockPrice.js";

const router = Router();

router.put("/", [
    auth,
    [
        check('ticker', 'Ticker is required').not().isEmpty(),
        check('name', 'Name is required').not().isEmpty(),
        check('volume', 'Volume is required').isInt().not().isEmpty()
    ]
], 
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let { ticker, name, volume } = req.body;
    ticker = ticker.toLowerCase();

    try {
        // Find user in db
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Check if the stock exists in the general stock collection
        const stock = await Stock.findOne({ ticker });
        if (!stock) {
            return res.status(404).json({ msg: "Stock not found in general stock collection" });
        }

        // Fetching per stock price here
        // const perStockPrice = await getStockPrice(ticker);

        // Check if the stock already exists in the user's ownedStocks
        const existingStockIndex = user.ownedStocks.findIndex(s => s.ticker === ticker);
        
        if (existingStockIndex !== -1) {
            // Stock exists, update the volume and current valuation
            user.ownedStocks[existingStockIndex].volume += volume;
        } else {
            // Stock does not exist, add new stock
            const newStock = {
                ticker,
                name,
                volume
            };
            user.ownedStocks.push(newStock);
        }

        // Save the updated user document
        await user.save();

        res.json(user.ownedStocks);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

export default router;