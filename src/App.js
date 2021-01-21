import './App.scss';
import Cart from './Cart';
import Order from './Order';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    useHistory,
} from 'react-router-dom';

function CartPage() {
    const history = useHistory();
    const goToSuccessPage = (id) => history.push(`/checkout/${id}/`);
    return (
        <>
            <h1 className="cart-page__title">Your cart</h1>
            <Cart onCheckout={goToSuccessPage} />
        </>
    );
}

function CheckoutSuccessPage() {
    const { id } = useParams();
    return (
        <>
            <h1 className="checkout-success-page__title">
                Checkout successful
            </h1>
            <p className="checkout-success-page__subtitle">
                Your order has been placed
            </p>
            <Order id={id} />
        </>
    );
}

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/checkout/:id/">
                    <CheckoutSuccessPage />
                </Route>
                <Route path="/">
                    <CartPage />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
