import React from 'react';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { ExampleApi, CartApi } from '../../src/client/api';
import { initStore } from '../../src/client/store';
import { Application } from '../../src/client/Application';
import { render } from '@testing-library/react';

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

describe('Юнит тесты для проверки общих требований', () => {

  it('хедер содержит ссылку на страницу каталога', async () => {
    const { getByRole } = renderContainer();
    const catalogLink = getByRole('link', { name: 'Catalog' });

    expect(catalogLink.getAttribute('href')).toBe('/catalog');
  })

  it('хедер содержит ссылку на страницу доставки', async () => {
    const { getByRole } = renderContainer();
    const deliveryLink = getByRole('link', { name: 'Delivery' });

    expect(deliveryLink.getAttribute('href')).toBe('/delivery');
  })

  it('хедер содержит ссылку на страницу контакты', async () => {
    const { getByRole } = renderContainer();
    const contactsLink = getByRole('link', { name: 'Contacts' });

    expect(contactsLink.getAttribute('href')).toBe('/contacts');
  })

  it('хедер содержит ссылку на страницу корзины', async () => {
    const { getByRole } = renderContainer();
    const cartLink = getByRole('link', { name: /Cart/ });

    expect(cartLink.getAttribute('href')).toBe('/cart');
  })

  it('название магазина в шапке должно быть ссылкой на главную страницу', async () => {
    const { getByRole } = renderContainer();
    const cartLink = getByRole('link', { name: 'Example store' });

    expect(cartLink.getAttribute('href')).toBe('/');
  })
})