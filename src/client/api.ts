import axios from 'axios';
import { CartState, CheckoutFormData, CheckoutResponse, Product, ProductShortInfo } from '../common/types';

const currentBugId = Number(process.env.BUG_ID) || undefined;

export class ExampleApi {
    constructor(private readonly basename: string) {

    }

    async getProducts() {
        return await axios.get<ProductShortInfo[]>(`${this.basename}/api/products`, { params: { bug_id: currentBugId } });
    }

    async getProductById(id: number) {
        return await axios.get<Product>(`${this.basename}/api/products/${id}`, { params: { bug_id: currentBugId } });
    }

    async checkout(form: CheckoutFormData, cart: CartState) {
        return await axios.post<CheckoutResponse>(`${this.basename}/api/checkout`, { form, cart }, { params: { bug_id: currentBugId } });
    }
}

export const LOCAL_STORAGE_CART_KEY = 'example-store-cart';

export class CartApi {
    getState(): CartState {
        try {
            const json = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
            return JSON.parse(json) as CartState || {};
        } catch {
            return {};
        }
    }

    setState(cart: CartState) {
        localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    }
}
