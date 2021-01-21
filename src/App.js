import './App.css';
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
    const checkout = (id) => history.push(`/checkout/${id}/`);
    return <Cart onCheckout={checkout} />;
}

function CheckoutSuccessPage() {
    const { id } = useParams();
    return <Order id={id} />;
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
