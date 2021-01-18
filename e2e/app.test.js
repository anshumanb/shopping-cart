const fs = require('fs');
const path = require('path');

const inRootDir = (...rest) => path.resolve(__dirname, '..', ...rest);
const readFile = (filePath) => {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch {
        return '';
    }
};
const readJson = (filePath) => JSON.parse(readFile(filePath) || null) || {};

const URL = 'http://localhost:3000';

describe('View cart', () => {
    beforeAll(async () => {
        await page.goto(URL);
    });

    it('should be titled "Shopping cart"', async () => {
        await expect(page.title()).resolves.toMatch('Shopping cart');
    });

    it('should display cart contents', async () => {
        const expected = readJson(inRootDir('cart.json'));
        const products = await page.$x('//li[contains(., "SKU")]');
        expect(products.length).toBe(expected.products.length);
        // verify SKUs
    });
});
