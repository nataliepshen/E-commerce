import ApiRequest from "@store/ApiRequest";
import { HttpMethod } from "@utils/httpMethod";
import { ILocalStore } from "@utils/useLocalStore";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { Product } from "src/App/MainPage/components/Catalog";

import { GetOneProductParams, IOneProductStore } from "./types";

type PrivatFields = "_product" | "_relatedItems";

const BaseURL = "https://api.escuelajs.co/api/v1";

export default class OneProductStore implements IOneProductStore, ILocalStore {
  private readonly _apiRequest = new ApiRequest(BaseURL);
  private _product: Product | null = null;
  private _relatedItems: Product[] = [];
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

  get product(): Product | null {
    return this._product;
  }

  get relatedItems(): Product[] {
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
      this._product = response.data;
      this._relatedItems = [];
      while (this._relatedItems.length < 3) {
        let item = Math.floor(Math.random() * relatedResponse.data.length);
        if (!this._relatedItems.includes(relatedResponse.data[item])) {
          this._relatedItems.push(relatedResponse.data[item]);
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
