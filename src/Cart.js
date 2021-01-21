import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product, Supplier, Payment, Quantity } from './Product';
import './Cart.scss';

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
        <form>
            <ul className="cart">
                {products.map((p) => {
                    return (
                        <li className="cart__product" key={p.sku}>
                            <Product product={p} />
                            <p className="cart-product__supplier-label">
                                Supplied by
                            </p>
                            <Supplier
                                className="cart-product__supplier"
                                supplier={p.supplier}
                            />
                            <Quantity
                                className="cart-product__quantity"
                                quantity={p.quantity}
                            />
                            <Payment
                                className="cart-product__payment"
                                payment={p.payment}
                            />
                        </li>
                    );
                })}
            </ul>
            <button className="cart__checkout" onClick={checkout}>
                Checkout
            </button>
        </form>
    );
}
