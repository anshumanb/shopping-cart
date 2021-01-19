import { useState, useEffect } from 'react';

async function getCart() {
    try {
        return (await fetch('/api/cart/')).json();
    } catch {
        return {
            products: [],
        };
    }
}

export default function Cart() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        (async () => {
            const cart = await getCart();
            setProducts(cart.products);
        })();
    }, []);

    return (
        <>
            {!!products.length && (
                <ul>
                    {products.map((p) => (
                        <li key={p.sku}>
                            <dl>
                                <dt>SKU</dt>
                                <dd>{p.sku}</dd>
                                <dt>Name</dt>
                                <dd>{p.name}</dd>
                                <dt>Quantity</dt>
                                <dd>{p.quantity}</dd>
                            </dl>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
