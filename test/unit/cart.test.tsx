import React from "react";
import { MemoryRouter } from "react-router";
import { fireEvent, getByText, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { CartApi, ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";
import { AxiosResponse } from "axios";
import { Product, ProductShortInfo } from "../../src/common/types";
import { Application } from "../../src/client/Application";


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
    <MemoryRouter initialEntries={[ '/' ]} initialIndex={0}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );
  return render(application);
}


describe('Юнит тесты для проверки добавления товара в корзину', () => {
  it('Нажатие кнопки "добавить в корзину" должно увеличивать количество товара в корзине и корзина должна сохраняться в localStorage', async () => {
    const { getByRole, getByText, container } = renderContainer();

    fireEvent.click(getByRole('link', { name: 'Catalog' }));
    
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

    const storage = localStorage['example-store-cart'];
    const dataInStorage = "{\"0\":{\"name\":\"Product 1\",\"count\":2,\"price\":300}}"
    expect(storage).toBe(dataInStorage);
  })

  it('Нажатие кнопки "Clear shopping cart" должно очищать корзину', async () => {
    const { getByRole, container } = renderContainer();

    fireEvent.click(getByRole('link', { name: 'Catalog' }));
    
    await waitFor(() => {
      expect(getByRole('link', { name: 'Details' }).getAttribute('href')).toBe('/catalog/0');
      fireEvent.click(getByRole('link', { name: 'Details' }));
    })

    await waitFor(() => {
      expect(getByRole('button', { name: 'Add to Cart' })).toBeTruthy();
      fireEvent.click(getByRole('button', { name: 'Add to Cart' }));
      fireEvent.click(getByRole('button', { name: 'Add to Cart' }));
    })

    fireEvent.click(getByRole('link', { name: /Cart/ }));
    fireEvent.click(getByRole('button', { name: 'Clear shopping cart' }));

    expect(container.querySelector('.col')?.innerHTML).toBe(`<h1>Shopping cart</h1>Cart is empty. Please select products in the <a href=\"/catalog\">catalog</a>.`);
  })
})