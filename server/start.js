import app from './index.js';
import { inRootDir, readJson } from './fileLoader.js';
import { readCart } from './cart.js';

const port = process.env.PORT || 8080;

app.locals.cart = readCart(readJson(inRootDir('cart.json')));

app.listen(port, () => console.log(`Listening on port ${port}`));
