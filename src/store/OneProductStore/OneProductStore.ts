import ApiRequest from "@store/ApiRequest";
import { normalizeProduct, ProductModel } from "@store/models/products";
import { HttpMethod } from "@utils/httpMethod";
import { ILocalStore } from "@utils/useLocalStore";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import { GetOneProductParams, IOneProductStore } from "./types";

type PrivatFields = "_product" | "_relatedItems";

const BaseURL = "https://api.escuelajs.co/api/v1";

export default class OneProductStore implements IOneProductStore, ILocalStore {
  private readonly _apiRequest = new ApiRequest(BaseURL);
  private _product: ProductModel | null = null;
  private _relatedItems: ProductModel[] = [];
  imageIndex: number = 0;
  prevDisabled: boolean = true;
  nextDisabled: boolean = false;

  constructor() {
    makeObservable<OneProductStore, PrivatFields>(this, {
      _product: observable.ref,
      _relatedItems: observable.ref,
      imageIndex: observable,
      prevDisabled: observable,
      nextDisabled: observable,
      product: computed,
      relatedItems: computed,
      getOneProduct: action,
      setNextTrue: action,
      setNextFalse: action,
      setPrevFalse: action,
      setPrevTrue: action,
      next: action,
      prev: action,
    });
  }

  get product(): ProductModel | null {
    return this._product;
  }

  get relatedItems(): ProductModel[] {
    return this._relatedItems;
  }

  async getOneProduct(params: GetOneProductParams): Promise<void> {
    const response = await this._apiRequest.sendRequest({
      method: HttpMethod.GET,
      url: `/products/${params.id}`,
    });
    const relatedResponse = await this._apiRequest.sendRequest({
      method: HttpMethod.GET,
      url: `/categories/${response.data.category.id}/products`,
    });
    runInAction(() => {
      this._product = normalizeProduct(response.data);
      this._relatedItems = [];
      while (this._relatedItems.length < 3) {
        let item = Math.floor(Math.random() * relatedResponse.data.length);
        if (!this._relatedItems.includes(relatedResponse.data[item])) {
          this._relatedItems.push(normalizeProduct(relatedResponse.data[item]));
        }
      }
    });
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
