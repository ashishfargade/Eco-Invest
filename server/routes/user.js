import express, { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import gravatar from "gravatar";

import User from "../models/User.js";
import { jwt_secret } from "../config.js";

const router = Router();

// @route POST api/users
// @desc REGISTER USER
// @access Public
router.post(
    "/",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Please include a valid email").not().isEmpty(),
        check("password", "Password should be min 6 characters").isLength({
            min: 6,
        }),
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            // Check if the user exists
            let user = await User.findOne({ email: email });

            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User already exists" }] });
            }

            // Get user gravatar
            const avatar = gravatar.url(email, {
                s: "200", //image size
                r: "pg", //rating
                d: "mm", //default
            });

            //Create user
            user = new User({
                name,
                email,
                avatar,
                password,
            });

            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            // Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                jwt_secret,
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );

            //res.send('User Registered');
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }

        console.log(req.body);
    }
);

export default router;