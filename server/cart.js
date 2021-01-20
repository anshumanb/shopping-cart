import express from 'express';
import { createOrder } from './orders.js';
import { CartStore } from './store.js';

const api = express.Router();

const getCart = (req) => req.app.locals.cart.getCart();

api.get('/', (req, res) => {
    res.json(getCart(req));
});

api.post('/checkout/', (req, res) => {
    const store = req.app.locals.orders;
    const cart = getCart(req);
    const orderId = store.addOrder(createOrder(cart));
    res.json({ orderId });
});

export function readCart(data) {
    return new CartStore({
        ...data,
        products: data.products.map((p) => {
            const {
                productSku: sku,
                productName: name,
                productType: type,
                productQuantity: quantity,
                productDescription: description,
                supplier: { supplierId, supplierName },
                ...rest
            } = p;
            const supplier = { id: supplierId, name: supplierName };
            return {
                sku,
                name,
                type,
                quantity,
                description,
                supplier,
                ...rest,
            };
        }),
    });
}

export default api;
