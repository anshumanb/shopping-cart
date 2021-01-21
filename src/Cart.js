import { useState, useEffect } from 'react';
import axios from 'axios';

async function getCart() {
    try {
        return (await axios.get('/api/cart/')).data;
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
