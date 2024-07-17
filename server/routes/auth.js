import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import { jwt_secret } from '../config.js';
import { auth } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// @route GET api/auth
// @desc TEST route
// @access Private
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

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
          let user = await User.findOne({ email: email });

          if (!user) {
              return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
              return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
          }

          const payload = { user: { id: user.id } };

          jwt.sign(payload, jwt_secret, { expiresIn: '1h' }, (err, token) => {
              if (err) throw err;

              console.log("Generated Token:", token); // Log the token to ensure it's generated

              res.cookie('token', token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'production',
                  sameSite: 'Lax',
                  maxAge: 3600000
              });

              res.json({ message: 'Logged in successfully' });
          });
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Server Error");
      }
  }
);


export default router;
