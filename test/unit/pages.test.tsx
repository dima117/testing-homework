import { it, expect } from "@jest/globals";
import { render } from "@testing-library/react";

import { Home } from "../../src/client/pages/Home";
import React from "react";
import { Delivery } from "../../src/client/pages/Delivery";
import { Contacts } from "../../src/client/pages/Contacts";

describe("Страницы", () => {
  it("Cтраницы __ главная, условия доставки, контакты __ должны иметь статическое содержимое", () => {
    // const appMain = createApp({ initialEntries: [PAGES["главная"]] });
    const renderedMain = render(<Home />);
    const renderedContacts = render(<Contacts />);
    const renderedDelivery = render(<Delivery />);

    expect(renderedMain.container.outerHTML).toMatchSnapshot();
    expect(renderedDelivery.container.outerHTML).toMatchSnapshot();
    expect(renderedContacts.container.outerHTML).toMatchSnapshot();
  });
});
