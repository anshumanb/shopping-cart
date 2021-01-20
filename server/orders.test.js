import request from 'supertest';
import { OrdersStore } from './store.js';
import { createOrder } from './orders.js';
import app from './index.js';

describe('get orders', () => {
    it('returns created orders', async () => {
        const expectedOrder = {
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
        };
        const ordersStore = new OrdersStore([]);
        ordersStore.addOrder({
            purchaseOrders: [expectedOrder],
        });
        app.locals.orders = ordersStore;

        const orderRes = await request(app).get('/api/orders/1/');
        expect(orderRes.body.purchaseOrders).toEqual([expectedOrder]);
    });
});

describe('createOrder', () => {
    it.each([
        [
            [{ sku: 'TEST01', supplier: { id: 'SUPP01' } }],
            [{ supplier: { id: 'SUPP01' }, products: [{ sku: 'TEST01' }] }],
        ],

        [
            [
                { sku: 'TEST01', supplier: { id: 'SUPP01' } },
                { sku: 'TEST02', supplier: { id: 'SUPP02' } },
            ],
            [
                {
                    supplier: { id: 'SUPP01' },
                    products: [{ sku: 'TEST01' }],
                },
                {
                    supplier: { id: 'SUPP02' },
                    products: [{ sku: 'TEST02' }],
                },
            ],
        ],

        [
            [
                { sku: 'TEST01', supplier: { id: 'SUPP01' } },
                { sku: 'TEST02', supplier: { id: 'SUPP02' } },
                { sku: 'TEST03', supplier: { id: 'SUPP01' } },
            ],
            [
                {
                    supplier: { id: 'SUPP01' },
                    products: [{ sku: 'TEST01' }, { sku: 'TEST03' }],
                },
                {
                    supplier: { id: 'SUPP02' },
                    products: [{ sku: 'TEST02' }],
                },
            ],
        ],
    ])('creates purchase orders', (cartProducts, expectedPurchaseOrders) => {
        expect(createOrder({ products: cartProducts })).toEqual({
            purchaseOrders: expectedPurchaseOrders,
        });
    });
});
