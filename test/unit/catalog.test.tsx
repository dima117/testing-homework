import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { AxiosResponse } from 'axios';

import { CartApi, ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Product, ProductShortInfo } from '../../src/common/types';
import { Application } from '../../src/client/Application';
import { ProductDetails } from '../../src/client/components/ProductDetails';

function renderContainer(component: JSX.Element) {
  const basename = '/hw/store';
  const expectedData = [
    { id: 0, name: 'Product 1', price: 300  },
  ]

  const api = new ExampleApi(basename);
  api.getProducts = async () => ({ data: expectedData } as AxiosResponse<ProductShortInfo[]>);
  const cart = new CartApi();
  const store = initStore(api, cart);

  const application = (
    <MemoryRouter initialEntries={[ '/catalog' ]} initialIndex={0}>
      <Provider store={store}>
        {component}
      </Provider>
    </MemoryRouter>
  );
  return render(application);
}

describe('Юнит тесты для проверки страницы каталога и товара', () => {
  it('B каталоге должны отображаться товары, список которых приходит с сервера', async () => {
    const { getByText, getByRole } = renderContainer(<Application />);

    await waitFor(() => {
      expect(getByRole('heading', { name: 'Product 1' })).toBeTruthy();
      expect(getByText('$300')).toBeTruthy();
      expect(getByRole('link', { name: 'Details' }).getAttribute('href')).toBe('/catalog/0');
    })
  })

  it('На странице с подробной информацией должна отображаться все необходимая информация', async () => {
    const product: Product = {
      description: 'new product',
      material: 'wood',
      color: 'brown',
      id: 0,
      name: 'chair',
      price: 100
    }
    const { getByText, getByRole } = renderContainer(<ProductDetails product={product} />);

    expect(getByText('new product')).toBeTruthy();
    expect(getByText('wood')).toBeTruthy();
    expect(getByText('brown')).toBeTruthy();
    expect(getByText('$100')).toBeTruthy();

    expect(getByRole('button', { name: 'Add to Cart' })).toBeTruthy();
  });

  it('Если кликнуть на кнопку, то товар добавится в корзину', async () => {
    const product: Product = {
      description: 'new product',
      material: 'wood',
      color: 'brown',
      id: 0,
      name: 'chair',
      price: 100
    }
    const { getByText, getByRole } = renderContainer(<ProductDetails product={product} />);
    
    const button = getByRole('button', { name: 'Add to Cart' });
    fireEvent.click(button);

    expect(getByText('Item in cart')).toBeTruthy();
  });
})