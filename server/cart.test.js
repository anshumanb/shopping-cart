import request from 'supertest';
import app from './index.js';

it('returns the products on the default cart', async () => {
    const defaultCart = {
        products: [
            { productSku: 'TEST001', productName: 'Test product' },
            { productSku: 'TEST002', productName: 'Test second product' },
            {
                productType: 'type',
                productQuantity: '2',
                productDescription: 'a description',
            },
        ],
    };
    const expected = {
        products: [
            { sku: 'TEST001', name: 'Test product' },
            { sku: 'TEST002', name: 'Test second product' },
            {
                type: 'type',
                quantity: '2',
                description: 'a description',
            },
        ],
    };
    app.locals.defaultCart = defaultCart;

    const res = await request(app).get('/api/cart/');

    expect(res.status).toBe(200);
    expect(res.body.products).toEqual(expected.products);
});
