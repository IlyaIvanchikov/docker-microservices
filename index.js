import express from 'express';
import mongoose from 'mongoose';
import {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    MONGO_PORT,
} from './config/config.js';
const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/mydb?authSource=admin`;

const connectWithRetry = () => {
    mongoose
        .connect(mongoURL)
        .then(() => console.log('connected mongoose db'))
        .catch((e) => {
            console.log(e);
            setTimeout(connectWithRetry, 1000);
        });
};

connectWithRetry();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`hello`);
});

app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
});
