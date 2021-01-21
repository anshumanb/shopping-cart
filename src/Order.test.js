import Order from './Order';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, within } from '@testing-library/react';

const response = {
    purchaseOrders: [
        {
            supplier: {
                id: 'SUPP01',
            },
            products: [
                {
                    sku: 'TEST01',
                    name: 'Custom Product A',
                    quantity: 500,
                    payment: {
                        symbol: '$$',
                        total: '999.99',
                    },
                },
                {
                    sku: 'TEST02',
                    name: 'Custom Product B',
                    quantity: 1500,
                    payment: {
                        symbol: '$$',
                        total: '199.99',
                    },
                },
            ],
        },
        {
            supplier: {
                id: 'SUPP02',
            },
            products: [
                {
                    sku: 'TEST03',
                    name: 'Custom Product AB',
                    quantity: 2500,
                    payment: { symbol: '$$', total: '9.99' },
                },
                {
                    sku: 'TEST04',
                    name: 'Custom Product BC',
                    quantity: 3500,
                    payment: {
                        symbol: '$$',
                        total: '99.99',
                    },
                },
            ],
        },
    ],
};

const orderId = 1;

const mockServer = setupServer(
    rest.get(`/api/orders/${orderId}/`, (_, res, ctx) => {
        return res(ctx.json(response));
    })
);

beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

it('should display order details', async () => {
    const purchaseOrders = response.purchaseOrders;
    const { findByRole } = render(<Order id={orderId} />);

    for (const purchaseOrder of purchaseOrders) {
        const { supplier, products } = purchaseOrder;
        const supplierEl = await findByRole('list', { name: supplier.id });
        const { getAllByRole } = within(supplierEl);
        const renderedProducts = getAllByRole('listitem');
        expect(renderedProducts).toHaveLength(products.length);

        renderedProducts.forEach((prod, index) => {
            const { getByText } = within(prod);
            expect(getByText(products[index].sku)).toBeVisible();
            expect(getByText(products[index].name)).toBeVisible();
            expect(getByText(products[index].quantity)).toBeVisible();
        });
    }
});
