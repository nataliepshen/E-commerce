import { action, computed, makeObservable, observable } from "mobx";
import ApiRequest from "store/ApiRequest";
import { normalizeProduct } from "store/models/normalize";
import { ProductModel } from "store/models/products";
import { getRandomRelatedItems } from "utils/getRandomRelatedItems";
import { ILocalStore } from "utils/useLocalStore";

import { IOneProductStore } from "./types";

type PrivatFields = "_product" | "_relatedItems";

export default class OneProductStore implements IOneProductStore, ILocalStore {
  id: string = "";
  private readonly _apiRequest = new ApiRequest();
  private _product: ProductModel | null = null;
  private _relatedItems: ProductModel[] = [];
  imageIndex: number = 0;
  prevDisabled: boolean = true;
  nextDisabled: boolean = false;

  constructor(id: string) {
    this.id = id;
    makeObservable<OneProductStore, PrivatFields>(this, {
      _product: observable.ref,
      _relatedItems: observable.ref,
      imageIndex: observable,
      prevDisabled: observable,
      nextDisabled: observable,
      product: computed,
      relatedItems: computed,
      setProduct: action.bound,
      setRelatedItems: action.bound,
      getOneProduct: action.bound,
      setNextTrue: action.bound,
      setNextFalse: action.bound,
      setPrevFalse: action.bound,
      setPrevTrue: action.bound,
      next: action.bound,
      prev: action.bound,
    });
  }

  get product(): ProductModel | null {
    return this._product;
  }

  get relatedItems(): ProductModel[] {
    return this._relatedItems;
  }

  setProduct(prod: ProductModel) {
    this._product = prod;
  }

  setRelatedItems(items: ProductModel[]) {
    this._relatedItems = items;
  }

  async getOneProduct(id: string): Promise<void> {
    const response = await this._apiRequest.sendRequest(`/products/${id}`);
    const relatedResponse = await this._apiRequest.sendRequest(
      `/categories/${response.data.category.id}/products`
    );
    const product = normalizeProduct(response.data);
    const relItems = getRandomRelatedItems(relatedResponse.data);
    /* Вот тут был runInAction, который терял контекст видимо */
    this.setProduct(product);
    this.setRelatedItems(relItems);
  }

  setNextTrue() {
    this.nextDisabled = true;
  }

  setNextFalse() {
    this.nextDisabled = false;
  }

  setPrevTrue() {
    this.prevDisabled = true;
  }

  setPrevFalse() {
    this.prevDisabled = false;
  }

  next = () => {
    if (this.imageIndex >= this.product!.images.length - 2) {
      this.setNextTrue();
    } else {
      this.setNextFalse();
    }
    if (this.product!.images.length > 1) {
      this.imageIndex++;
    }
    this.setPrevFalse();
  };

  prev = () => {
    if (this.imageIndex === 1) {
      this.setPrevTrue();
    } else {
      this.setPrevFalse();
    }
    if (this.product!.images.length > 1) {
      this.imageIndex--;
    }
    this.setNextFalse();
  };

  destroy(): void {}
}
