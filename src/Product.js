import './Product.scss';

function SRLabel({ text }) {
    return <span className="sr-label">{text}</span>;
}

function KeyValue({ entries, ...rest }) {
    return (
        <dl {...rest}>
            {entries.map(({ key, value, className, ...rest }) => (
                <>
                    <dt>
                        <SRLabel text={key} />
                    </dt>
                    <dd
                        className={`key-value__value ${className || ''}`}
                        {...rest}
                    >
                        {value}
                    </dd>
                </>
            ))}
        </dl>
    );
}
export function Product({ product: { name, description, sku } }) {
    const entries = [
        { key: 'Name', value: name, className: 'product__name' },
        {
            key: 'Description',
            value: description,
            className: 'product__description',
        },
        { key: 'SKU', value: sku, className: 'product__sku' },
    ];
    return <KeyValue entries={entries} />;
}

export function Supplier({ className = '', nameId, supplier }) {
    const entries = [
        {
            key: 'Supplier name',
            value: supplier.name,
            className: 'supplier__name',
        },
        {
            key: 'Supplier ID',
            value: supplier.id,
            className: 'supplier__id',
            id: nameId,
        },
    ];
    return <KeyValue className={`supplier ${className}`} entries={entries} />;
}

export function Quantity({ quantity, ...rest }) {
    return (
        <p {...rest}>
            <span className="quantity__label">Quantity</span>
            <span>{quantity}</span>
        </p>
    );
}

export function Payment({ payment, ...rest }) {
    const { symbol, total } = payment;
    return (
        <p {...rest}>
            <span className="payment__label">Payment</span>
            <span>{`${symbol}${total}`}</span>
        </p>
    );
}
