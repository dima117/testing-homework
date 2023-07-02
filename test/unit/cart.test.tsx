import React from "react";
import { MemoryRouter } from "react-router";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { CartApi, ExampleApi } from "../../src/client/api";
import { addToCart, initStore } from "../../src/client/store";
import { Application } from "../../src/client/Application";


function renderContainer() {
  const basename = '/hw/store';

  const expectedDataWithDetails = {
    id: 0,
    name: 'Product 1',
    price: 300,
    description: 'new product',
    material: 'wood',
    color: 'red'
  }

  const api = new ExampleApi(basename);
  const cart = new CartApi();
  const store = initStore(api, cart);
  store.dispatch((addToCart(expectedDataWithDetails)));

  const application = (
    <MemoryRouter initialEntries={[ '/cart' ]} initialIndex={0}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );
  return render(application);
}


describe('Юнит тесты для проверки страницы корзины', () => {
  it('Нажатие кнопки "Clear shopping cart" должно очищать корзину', async () => {
    const { getByRole, container } = renderContainer();

    await waitFor(() => {
      expect(container.querySelector('.Cart-Count')?.innerHTML).toBe('1');
    })

    fireEvent.click(getByRole('button', { name: 'Clear shopping cart' }));

    expect(container.querySelector('.col')?.innerHTML).toBe(`<h1>Shopping cart</h1>Cart is empty. Please select products in the <a href=\"/catalog\">catalog</a>.`);
  })

  it('Состояние корзины должно сохраняться в localStorage', async () => {
    renderContainer();

    const storage = localStorage['example-store-cart'];
    const dataInStorage = "{\"0\":{\"name\":\"Product 1\",\"count\":1,\"price\":300}}";
    expect(storage).toBe(dataInStorage);
  })
})