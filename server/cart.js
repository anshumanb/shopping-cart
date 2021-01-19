import express from 'express';

const api = express.Router();

api.get('/', (req, res) => {
    const cart = req.app.locals.defaultCart;
    res.json({
        ...cart,
        products: cart.products.map((p) => {
            const {
                productSku: sku,
                productName: name,
                productType: type,
                productQuantity: quantity,
                productDescription: description,
                ...rest
            } = p;
            return { sku, name, type, quantity, description, ...rest };
        }),
    });
});

export default api;
