const URL = 'http://localhost:3000';

describe('View cart', () => {
    beforeAll(async () => {
        await page.goto(URL);
    });

    it('should be titled "Shopping cart"', async () => {
        await expect(page.title()).resolves.toMatch('Shopping cart');
    });
});
