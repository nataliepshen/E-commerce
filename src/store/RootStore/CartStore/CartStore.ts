import { action, computed, makeObservable, observable } from "mobx";
import { ProductModel } from "store/models/products";
import { ILocalStore } from "utils/useLocalStore";

import { ICartStore, normalizeProductToCart, ProductInCart } from "./types";

type PrivatFields = "_productsInCart";

export default class CartStore implements ICartStore, ILocalStore {
  private _productsInCart: ProductInCart[] = [];

  constructor() {
    makeObservable<CartStore, PrivatFields>(this, {
      _productsInCart: observable,
      productsInCart: computed,
      totalQuantity: computed,
      totalSum: computed,
      addProductQuantity: action.bound,
      reduceProductQuantity: action.bound,
      addProductToCart: action.bound,
      clearCart: action.bound,
    });
  }

  get productsInCart(): ProductInCart[] {
    return this._productsInCart;
  }

  get totalQuantity(): number {
    let quantityArray: number[] = [];
    for (let item of this._productsInCart) {
      quantityArray.push(item.quantity);
    }
    return quantityArray.reduce((item, sum) => sum + item, 0);
  }

  get totalSum(): number {
    let sumArray: number[] = [];
    for (let item of this._productsInCart) {
      sumArray.push(item.quantity * item.price);
    }
    return sumArray.reduce((item, sum) => sum + item, 0);
  }

  addProductQuantity(product: ProductInCart): void {
    const index = this.productsInCart.findIndex(
      (item) => item.id === product.id
    );
    this._productsInCart[index].quantity++;
  }

  reduceProductQuantity(product: ProductInCart): void {
    const index = this.productsInCart.findIndex(
      (item) => item.id === product.id
    );
    if (this._productsInCart[index].quantity === 1) {
      this._productsInCart.splice(index, 1);
    } else {
      this._productsInCart[index].quantity--;
    }
  }

  addProductToCart(product: ProductModel): void {
    const productToCart: ProductInCart = normalizeProductToCart(product);
    if (this._productsInCart.find((item) => item.id === productToCart.id)) {
      this.addProductQuantity(productToCart);
    } else {
      this._productsInCart.push(productToCart);
    }
  }

  clearCart(): void {
    this._productsInCart = [];
  }

  destroy(): void {}
}
