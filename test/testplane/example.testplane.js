describe('github', function() {
    it('should check repository name', async ({ browser }) => {
        await browser.url('https://github.com/gemini-testing/testplane');

        await expect(browser.$('#readme h1')).toHaveText('Testplane (ex-Hermione)');
    });
});
