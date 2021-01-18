import Cart from './Cart';
import { render, within } from '@testing-library/react';

it('should display given products', () => {
    const products = [
        { sku: 'TEST01', name: 'Custom Product A', quantity: 500 },
        {
            sku: 'TEST02',
            name: 'Custom Product B',
            quantity: 1500,
        },
    ];

    const { getAllByRole } = render(<Cart products={products} />);
    const renderedProducts = getAllByRole('listitem');
    expect(renderedProducts).toHaveLength(products.length);

    renderedProducts.forEach((prod, index) => {
        const { getByText } = within(prod);
        expect(getByText(products[index].sku)).toBeInTheDocument();
        expect(getByText(products[index].name)).toBeInTheDocument();
        expect(getByText(products[index].quantity)).toBeInTheDocument();
    });
});

// empty cart
