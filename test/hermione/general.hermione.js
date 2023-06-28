describe('Интеграционные тесты для проверки общих требований', () => {
    it('Вёрстка должна адаптироваться под ширину экрана', async ({ browser }) => {
        await browser.url('http://localhost:3000/hw/store');
        await browser.assertView('plain', '.Application', {
            screenshotDelay: 3000
        });
    })
})
