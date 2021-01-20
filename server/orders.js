import express from 'express';

const api = express.Router();

api.get('/:id/', (req, res) => {
    const id = parseInt(req.params.id);
    res.json(req.app.locals.orders.getOrder(id));
});

export function createOrder(cart) {
    const purchaseOrders = cart.products.reduce((acc, product) => {
        const { supplier, ...rest } = product;
        const purchaseOrder = acc[supplier.id] || { supplier, products: [] };
        return {
            ...acc,
            [supplier.id]: {
                ...purchaseOrder,
                products: purchaseOrder.products.concat([rest]),
            },
        };
    }, {});
    return {
        purchaseOrders: Object.values(purchaseOrders),
    };
}

export default api;
