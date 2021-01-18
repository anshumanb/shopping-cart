export default function Cart({ products = [] }) {
    return (
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
    );
}
