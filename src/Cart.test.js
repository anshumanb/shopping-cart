import Cart from './Cart';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, within } from '@testing-library/react';

const response = {
    products: [
        { sku: 'TEST01', name: 'Custom Product A', quantity: 500 },
        {
            sku: 'TEST02',
            name: 'Custom Product B',
            quantity: 1500,
        },
    ],
};

const mockServer = setupServer(
    rest.get('/api/cart/', (_, res, ctx) => {
        return res(ctx.json(response));
    })
);

beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

it('should display cart contents', async () => {
    const products = response.products;

    const { findAllByRole } = render(<Cart />);
    const renderedProducts = await findAllByRole('listitem');
    expect(renderedProducts).toHaveLength(products.length);

    renderedProducts.forEach((prod, index) => {
        const { getByText } = within(prod);
        expect(getByText(products[index].sku)).toBeVisible();
        expect(getByText(products[index].name)).toBeVisible();
        expect(getByText(products[index].quantity)).toBeVisible();
    });
});
