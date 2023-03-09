import { normalizeProduct, ProductModel } from "@store/models/products";
import rootStore from "@store/RootStore/instance";
import { HttpMethod } from "@utils/httpMethod";
import { ILocalStore } from "@utils/useLocalStore";
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";

import { GetProductListParams, IProductListStore } from "./types";
import ApiRequest from "../ApiRequest";

type PrivatFields = "_productList" | "_quantity";

const BaseURL = "https://api.escuelajs.co/api/v1";

export default class ProductListStore
  implements IProductListStore, ILocalStore
{
  private readonly _apiRequest = new ApiRequest(BaseURL);
  private _productList: ProductModel[] = [];
  private _quantity: number = 0;

  constructor() {
    makeObservable<ProductListStore, PrivatFields>(this, {
      _productList: observable.ref,
      _quantity: observable,
      productList: computed,
      quantity: computed,
      currentPage: computed,
      getProductList: action,
    });
  }

  get productList(): ProductModel[] {
    return this._productList;
  }

  get quantity(): number {
    return this._quantity;
  }

  get currentPage(): number {
    return Number(rootStore.query.getParam("page"));
  }

  async getProductList(params: GetProductListParams): Promise<void> {
    const limit = 9;
    const offset = (params.page! - 1) * limit;
    this._productList = [];
    let urlProducts = "";
    let urlQuantity = "";
    if (params.value) {
      urlProducts = `/products?title=${params.value}&offset=${offset}&limit=${limit}`;
      urlQuantity = `/products/?title=${params.value}`;
    } else {
      urlProducts = `/products?offset=${offset}&limit=${limit}`;
      urlQuantity = `/products`;
    }
    const response = await this._apiRequest.sendRequest({
      method: HttpMethod.GET,
      url: urlProducts,
    });
    const quantity = await this._apiRequest.sendRequest({
      method: HttpMethod.GET,
      url: urlQuantity,
    });
    runInAction(() => {
      this._productList = response.data.map(normalizeProduct);
      this._quantity = quantity.data.length;
    });
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => this.currentPage,
    (page: number) => {
      const value = String(rootStore.query.getParam("query"));
      this.getProductList({ page, value });
    }
  );

  destroy(): void {}
}
