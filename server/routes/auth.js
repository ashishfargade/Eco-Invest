import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator'

import { jwt_secret } from '../config.js'
import { auth } from '../middleware/auth.js'
import User from '../models/User.js'


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
    ],

    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        // Check if the user exists
        let user = await User.findOne({ email: email });
  
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }
  
        //Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }
  
        // Return jsonwebtoken
        const payload = {
          user: {
            id: user.id,
          },
        };
  
        jwt.sign(payload, jwt_secret, { expiresIn: 360000 }, (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
  
        //res.send('User Registered');
      } catch (error) {
        console.error(error.message);
        res.send(500).send("Server Error");
      }
  
      console.log(req.body);
    }
);

export default router;