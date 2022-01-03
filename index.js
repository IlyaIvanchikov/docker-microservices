import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';
import {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    MONGO_PORT,
    REDIS_URL,
    REDIS_PORT,
    SESSION_SECRET,
} from './config/config.js';
const app = express();

import { postRoutes } from './routes/post.js';
import { authRoutes } from './routes/auth.js';

const RedisStore = connectRedis(session);

const redisClient = redis.createClient({
    url: `redis://${REDIS_URL}:${REDIS_PORT}`,
});
await redisClient.connect();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/mydb?authSource=admin`;

const connectWithRetry = () => {
    mongoose
        .connect(mongoURL)
        .then(() => console.log('connected mongoose db'))
        .catch((e) => {
            console.log(e);
            setTimeout(connectWithRetry, 5000);
        });
};

connectWithRetry();

const PORT = process.env.PORT || 3000;

app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: SESSION_SECRET,

        cookie: {
            resave: false,
            saveUninitialized: false,
            secure: false, // if true only transmit cookie over https
            httpOnly: true, // if true prevent client side JS from reading the cookie
            maxAge: 300000, // session max age in miliseconds
        },
    }),
);

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`hello`);
});

app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
});
