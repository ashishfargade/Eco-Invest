import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator'

import { jwt_secret } from '../config.js'
import { auth } from '../middleware/auth.js'


const router = express.Router();


// @route GET api/auth
// @desc TEST route
// @access Public
router.get("/", auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
})


// @route POST api/auth
// @desc Authenticate User and get token
// @access Public
router.post(
    "/",
    [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password Required").exists(),
    ]
)