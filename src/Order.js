import { useEffect, useState } from 'react';
import axios from 'axios';

async function getOrder(id) {
    try {
        return (await axios.get(`/api/orders/${id}/`)).data;
    } catch {
        return {
            purchaseOrders: [],
        };
    }
}

function Product({ product }) {
    return (
        <dl>
            <dt>SKU</dt>
            <dd>{product.sku}</dd>
            <dt>Name</dt>
            <dd>{product.name}</dd>
            <dt>Quantity</dt>
            <dd>{product.quantity}</dd>
        </dl>
    );
}

function PurchaseOrder({ purchaseOrder }) {
    const { supplier, products } = purchaseOrder;
    const supplierId = supplier.id;
    return (
        <>
            <p id={supplierId}>{supplierId}</p>
            <ul aria-labelledby={supplierId}>
                {products.map((p) => (
                    <li key={p.sku}>
                        <Product product={p} />
                    </li>
                ))}
            </ul>
        </>
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
        <>
            {!!purchaseOrders.length && (
                <ul>
                    {purchaseOrders.map((po) => (
                        <li key={po.supplier.id}>
                            <PurchaseOrder purchaseOrder={po} />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
