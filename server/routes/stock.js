import { Router } from "express";

import Stock from "../models/Stock.js";
import { auth } from "../middleware/auth.js";

const router = Router();

// @route GET api/stock
// @desc GET Stock Details
// @access Private
router.get("/", auth, async (req, res) => {
    
    const { ticker } = req.body;

    try {
        if (!ticker) {
            return res.status(400).json({ msg: "Ticker is required" });
        }

        const stock = await Stock.findOne({ ticker: ticker.toLowerCase() });

        if (!stock) {
            return res.status(404).json({ msg: "Stock not found" });
        }

        res.json(stock);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

export default router;