import React from "react";
import { MemoryRouter } from "react-router";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { CartApi, ExampleApi } from "../../src/client/api";
import { addToCart, initStore } from "../../src/client/store";
import { Application } from "../../src/client/Application";


function renderContainer(emptyCart: boolean = false) {
  const basename = '/hw/store';

  const api = new ExampleApi(basename);
  const cart = new CartApi();
  const store = initStore(api, cart);
  if (!emptyCart) {
    store.dispatch(addToCart({
      id: 0,
      name: 'Product 1',
      price: 300,
      description: 'new product',
      material: 'wood',
      color: 'red'
    }));
    store.dispatch(addToCart({
      id: 1,
      name: 'Product 2',
      price: 100,
      description: 'new product',
      material: 'aluminium',
      color: 'gray'
    }));
  }

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
  it('Если корзина пустая, должна отображаться ссылка на каталог товаров', () => {
    const { getByRole } = renderContainer(true);

    expect(getByRole('link', { name: 'catalog' }).getAttribute('href')).toBe('/catalog');
  })

  it('Состояние корзины должно сохраняться в localStorage', async () => {
    renderContainer();

    const storage = localStorage['example-store-cart'];
    const dataInStorage = "{\"0\":{\"name\":\"Product 1\",\"count\":1,\"price\":300},\"1\":{\"name\":\"Product 2\",\"count\":1,\"price\":100}}";
    expect(storage).toBe(dataInStorage);
  })

  it('В шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', () => {
    const { getByRole } = renderContainer();

    expect(getByRole('link', { name: /Cart/ }).textContent).toBe('Cart (2)');
  })

  it('В корзине должна отображаться таблица с добавленными в нее товарами', () => {
    const { container } = renderContainer();
    
    const table = container.querySelector('.Cart-Table');
    expect(table).toBeTruthy();
  })

  it('Нажатие кнопки "Clear shopping cart" должно очищать корзину', async () => {
    const { getByRole } = renderContainer();

    fireEvent.click(getByRole('button', { name: 'Clear shopping cart' }));

    const storage = localStorage['example-store-cart'];
    expect(storage).toBe("{}");
  })

  it('Для каждого товара должны отображаться название, цена, количество, стоимость, а также должна отображаться общая сумма заказа', () => {
    const { container } = renderContainer();

    const names = Array.from(container.querySelectorAll('.Cart-Name')).map((i) => i.textContent);
    const prices = Array.from(container.querySelectorAll('.Cart-Price')).map((i) => i.textContent);
    const counts = Array.from(container.querySelectorAll('.Cart-Count')).map((i) => i.textContent);
    const totalPrices = Array.from(container.querySelectorAll('.Cart-Total')).map((i) => i.textContent);
    
    expect(names).toStrictEqual(["Product 1", "Product 2"]);
    expect(prices).toStrictEqual(["$300", "$100"]);
    expect(counts).toStrictEqual(["1", "1"]);
    expect(totalPrices).toStrictEqual(["$300", "$100"]);
    expect(container.querySelector('.Cart-OrderPrice')?.textContent).toStrictEqual("$400");
  })
})