import express from 'express';
import { inBuildDir } from './fileLoader.js';
import cartApi from './cart.js';

const app = express();

app.locals.defaultCart = {};

app.use('/api/cart', cartApi);

app.use(express.static(inBuildDir()));

app.use((_, res) => {
    res.sendFile(inBuildDir('index.html'));
});

export default app;
