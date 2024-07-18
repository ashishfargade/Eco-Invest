import express from 'express';
import cors from 'cors';

import { port } from './config.js';
import { connectDB } from './db.js';
import user from './routes/user.js';
import auth from './routes/auth.js';
import stock from './routes/stock.js';
import userStock from './routes/userStock.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type, x-auth-token',
    credentials : true
}));

connectDB();

app.get('/', (req, res) => {
    res.send('API RUNNING');
})

app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/stock', stock);
app.use('/api/userStock', userStock);

app.listen(port, () => {
    console.log(`Server running on PORT ${port}`);
})