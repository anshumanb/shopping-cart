import { useEffect, useState } from 'react';
import axios from 'axios';
import { Product, Supplier, Payment, Quantity } from './Product';
import './Order.scss';

async function getOrder(id) {
    try {
        return (await axios.get(`/api/orders/${id}/`)).data;
    } catch {
        return {
            purchaseOrders: [],
        };
    }
}

function PurchaseOrder({ purchaseOrder }) {
    const { supplier, products } = purchaseOrder;
    const supplierId = supplier.id;
    return (
        <div className="purchase-order">
            <Supplier
                className="purchase-order__supplier"
                nameId={supplierId}
                supplier={supplier}
            />
            <ul
                className="purchase-order__products"
                aria-labelledby={supplierId}
            >
                {products.map((p) => (
                    <li className="purchase-order__product" key={p.sku}>
                        <Product product={p} />
                        <Quantity quantity={p.quantity} />
                        <Payment payment={p.payment} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function Order({ id }) {
    const [purchaseOrders, setPurchaseOrders] = useState([]);

    useEffect(() => {
        (async () => {
            const order = await getOrder(id);
            setPurchaseOrders(order.purchaseOrders);
        })();
    }, [id]);

    return (
        <ul className="order">
            {purchaseOrders.map((po) => (
                <li className="order__purchase-order" key={po.supplier.id}>
                    <PurchaseOrder purchaseOrder={po} />
                </li>
            ))}
        </ul>
    );
}
