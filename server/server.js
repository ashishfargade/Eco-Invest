import express from 'express'

import { port } from './config.js';
import { connectDB } from './db.js';

const app = express();

app.use(express.json());
connectDB();

app.get('/', (req, res) => {
    res.send('API RUNNING');
})

app.listen(port, () => {
    console.log(`Server running on PORT ${port}`);
})