import React from 'react';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { ExampleApi, CartApi } from '../../src/client/api';
import { initStore } from '../../src/client/store';
import { Application } from '../../src/client/Application';
import { fireEvent, render } from '@testing-library/react';

function renderContainer() {
  const basename = '/hw/store';

  const api = new ExampleApi(basename);
  const cart = new CartApi();
  const store = initStore(api, cart);

  const application = (
    <BrowserRouter>
      <Provider store={store}>
        <Application />
      </Provider>
    </BrowserRouter>
  );
  return render(application);
}

async function checkBurgerMenu() {
  // await page.setViewport({
  //   width: 575,
  //   height: 480,
  // })
  // await page.goto('http://localhost:3000/hw/store');
  // await page.waitForSelector('.Application', {
  //     timeout: 3000
  // });
  // return page;
}

describe('Юнит тесты для проверки общих требований', () => {

  it('хедер содержит ссылку на страницу каталога', () => {
    const { getByRole } = renderContainer();
    const catalogLink = getByRole('link', { name: 'Catalog' });

    expect(catalogLink.getAttribute('href')).toBe('/catalog');
  })

  it('хедер содержит ссылку на страницу доставки', () => {
    const { getByRole } = renderContainer();
    const deliveryLink = getByRole('link', { name: 'Delivery' });

    expect(deliveryLink.getAttribute('href')).toBe('/delivery');
  })

  it('хедер содержит ссылку на страницу контакты', () => {
    const { getByRole } = renderContainer();
    const contactsLink = getByRole('link', { name: 'Contacts' });

    expect(contactsLink.getAttribute('href')).toBe('/contacts');
  })

  it('хедер содержит ссылку на страницу корзины', () => {
    const { getByRole } = renderContainer();
    const cartLink = getByRole('link', { name: /Cart/ });

    expect(cartLink.getAttribute('href')).toBe('/cart');
  })

  it('название магазина в шапке должно быть ссылкой на главную страницу', () => {
    const { getByRole } = renderContainer();
    const cartLink = getByRole('link', { name: 'Example store' });

    expect(cartLink.getAttribute('href')).toBe('/');
  })

  it('Hа ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', () => {
    const { container } = renderContainer();
    jest.spyOn(screen, 'width', 'get').mockReturnValue(575);

    expect(screen.width).toBe(575);
    expect(container.querySelector('.Application-Toggler')).toBeTruthy();
    expect(container.querySelector('.collapse')).toBeTruthy();
  })

  it('При выборе элемента из меню "гамбургера", меню должно закрываться', async () => {
    const { container, getByRole } = renderContainer();
    jest.spyOn(screen, 'width', 'get').mockReturnValue(575);

    fireEvent.click(container.querySelector('.Application-Toggler')!);
    expect(container.querySelector('.collapse')).toBeFalsy();
    fireEvent.click(getByRole('link', { name: 'Catalog' }));
    expect(container.querySelector('.collapse')).toBeTruthy();
  })
})