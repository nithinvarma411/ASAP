import express from 'express';
import dotenv from "dotenv"
dotenv.config()
import connectDB from './src/db/db.js';

const app = express();

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use(express.json())

import webSeriesRouter from "./src/routes/webSeries.router.js"

app.use("/api/v1/WebSeries", webSeriesRouter)


app.listen(3000, (req, res) => {
    connectDB().then(() => {
      console.log('Server is running on http://localhost:3000');
    }).catch((error) => {
        console.error(error)
    })
})