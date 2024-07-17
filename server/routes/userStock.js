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
        check('volume', 'Volume is required').isInt().not().isEmpty(),
        check('dateBought', 'Date is required and should be at least a day old').isISO8601().toDate().not().isEmpty(),
    ]
], 
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let { ticker, name, volume, dateBought } = req.body;
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

        // Fetching stock price by volume and date
        let perPrice = await getStockPrice(ticker, dateBought);

        let valueAtPurchase = perPrice*volume;


        const newStock = {
            ticker,
            name,
            volume,
            valueAtPurchase,
            dateBought
        };

        user.ownedStocks.push(newStock);

        // Save the updated user document
        await user.save();

        res.json(user.ownedStocks);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

export default router;
