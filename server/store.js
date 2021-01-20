export class OrdersStore {
    constructor(orders = []) {
        this.orders = orders;
    }

    addOrder(order) {
        const id = this.orders.length + 1;
        this.orders = this.orders.concat({ id: id, ...order });
        return id;
    }

    getOrder(id) {
        return this.orders.find((order) => order.id === id);
    }
}

export class CartStore {
    constructor(cart = {}) {
        this.cart = cart;
    }

    getCart() {
        return this.cart;
    }
}
