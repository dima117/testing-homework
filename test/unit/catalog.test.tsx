import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { AxiosResponse } from 'axios';

import { CartApi, ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Product, ProductShortInfo } from '../../src/common/types';
import { Application } from '../../src/client/Application';

function renderContainer() {
  const basename = '/hw/store';
  const expectedData = [
    { id: 0, name: 'Product 1', price: 300 },
  ]
  const expectedDataWithDetails = {
    id: 0,
    name: 'Product 1',
    price: 300,
    description: 'new product',
    material: 'wood',
    color: 'red'
  }

  const api = new ExampleApi(basename);
  api.getProducts = async () => ({ data: expectedData } as AxiosResponse<ProductShortInfo[]>);
  api.getProductById = async (id: number) => ({ data: expectedDataWithDetails } as AxiosResponse<Product>);
  const cart = new CartApi();
  const store = initStore(api, cart);

  const application = (
    <MemoryRouter initialEntries={[ '/catalog' ]} initialIndex={0}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );
  return render(application);
}

describe('Юнит тесты для проверки страницы каталога и товара', () => {
  it('B каталоге должны отображаться товары, список которых приходит с сервера', async () => {
    const { getByText, getByRole } = renderContainer();

    await waitFor(() => {
      expect(getByRole('heading', { name: 'Product 1' })).toBeTruthy();
      expect(getByText('$300')).toBeTruthy();
      expect(getByRole('link', { name: 'Details' }).getAttribute('href')).toBe('/catalog/0');
    })
  })

  it('На странице с подробной информацией должна отображаться все необходимая информация', async () => {
    const { getByText, getByRole } = renderContainer();

    await waitFor(() => {
      expect(getByRole('link', { name: 'Details' }).getAttribute('href')).toBe('/catalog/0');
      fireEvent.click(getByRole('link', { name: 'Details' }));
    })

    await waitFor(() => {
      expect(getByText('Product 1')).toBeTruthy();
      expect(getByText('wood')).toBeTruthy();
      expect(getByText('red')).toBeTruthy();
      expect(getByText('$300')).toBeTruthy();
      expect(getByRole('button', { name: 'Add to Cart' })).toBeTruthy();
    })
  });

  it('Нажатие кнопки "добавить в корзину" должно увеличивать количество товара в корзине', async () => {
    const { getByRole, getByText, container } = renderContainer();
    
    await waitFor(() => {
      expect(getByRole('link', { name: 'Details' }).getAttribute('href')).toBe('/catalog/0');
      fireEvent.click(getByRole('link', { name: 'Details' }));
    })

    await waitFor(() => {
      expect(getByRole('button', { name: 'Add to Cart' })).toBeTruthy();
      expect(container.querySelector('.CartBadge')).toBe(null);
      fireEvent.click(getByRole('button', { name: 'Add to Cart' }));
      fireEvent.click(getByRole('button', { name: 'Add to Cart' }));
    })

    expect(getByText('Item in cart')).toBeTruthy();
    fireEvent.click(getByRole('link', { name: /Cart/ }));
    expect(container.querySelector('.Cart-Count')?.innerHTML).toBe('2');
  })
})