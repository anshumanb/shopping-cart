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

async function checkoutCart() {
    return (await axios.post('/api/cart/checkout/')).data.orderId;
}

export default function Cart({ onCheckout }) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        (async () => {
            const cart = await getCart();
            setProducts(cart.products);
        })();
    }, []);

    const checkout = async (e) => {
        e.preventDefault();
        const orderId = await checkoutCart();
        onCheckout && onCheckout(orderId);
    };

    return (
        <>
            {!!products.length && (
                <form>
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
                    <button onClick={checkout}>Checkout</button>
                </form>
            )}
        </>
    );
}
