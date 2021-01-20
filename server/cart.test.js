import request from 'supertest';
import { OrdersStore, CartStore } from './store.js';
import app from './index.js';

describe('get cart', () => {
    it('returns the products on the cart', async () => {
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
        app.locals.cart = new CartStore(expected);

        const res = await request(app).get('/api/cart/');

        expect(res.body.products).toEqual(expected.products);
    });
});

describe('checkout', () => {
    it('returns order ID', async () => {
        app.locals.cart = new CartStore({
            products: [{ sku: 'TEST0001', supplier: { id: '0001' } }],
        });
        app.locals.orders = new OrdersStore([]);

        const res1 = await request(app).post('/api/cart/checkout/');

        expect(res1.body.orderId).toBe(1);

        const res2 = await request(app).post('/api/cart/checkout/');

        expect(res2.body.orderId).toBe(2);
    });

    it('adds purchase order to store', async () => {
        const ordersStore = new OrdersStore([]);
        app.locals.orders = ordersStore;
        app.locals.cart = new CartStore({
            products: [
                {
                    sku: 'TEST01',
                    quantity: '50',
                    payment: {
                        currency: 'NZD',
                        symbol: '$',
                        total: 30000,
                    },
                    supplier: {
                        id: 'SUPP01',
                    },
                },
            ],
        });

        const res = await request(app).post('/api/cart/checkout/');

        const createdOrder = ordersStore.getOrder(res.body.orderId);
        expect(createdOrder.purchaseOrders).toEqual([
            {
                supplier: {
                    id: 'SUPP01',
                },
                products: [
                    {
                        sku: 'TEST01',
                        quantity: '50',
                        payment: {
                            currency: 'NZD',
                            symbol: '$',
                            total: 30000,
                        },
                    },
                ],
            },
        ]);
    });
});
