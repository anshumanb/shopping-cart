import express from 'express';
import { inBuildDir } from './fileLoader.js';
import cartApi from './cart.js';
import ordersApi from './orders.js';
import { OrdersStore, CartStore } from './store.js';

const app = express();

app.locals.cart = new CartStore({});
app.locals.orders = new OrdersStore([]);

app.use('/api/cart', cartApi);
app.use('/api/orders', ordersApi);

app.use(express.static(inBuildDir()));

app.use((_, res) => {
    res.sendFile(inBuildDir('index.html'));
});

export default app;
