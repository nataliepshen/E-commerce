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
import { Product } from "src/App/MainPage/components/Catalog";

import {
  GetProductListParams,
  GetSearchProductsParams,
  IProductListStore,
} from "./types";
import ApiRequest from "../ApiRequest";

type PrivatFields = "_productList" | "_quantity";

const BaseURL = "https://api.escuelajs.co/api/v1";

export default class ProductListStore
  implements IProductListStore, ILocalStore
{
  private readonly _apiRequest = new ApiRequest(BaseURL);
  private _productList: Product[] = [];
  private _quantity: number = 0;

  constructor() {
    makeObservable<ProductListStore, PrivatFields>(this, {
      _productList: observable.ref,
      _quantity: observable,
      productList: computed,
      quantity: computed,
      currentPage: computed,
      getProductList: action,
      getQuantity: action,
    });
  }

  get productList(): Product[] {
    return this._productList;
  }

  get quantity(): number {
    return this._quantity;
  }

  get currentPage(): number {
    return Number(rootStore.query.getParam("page"));
  }

  async getProductList(params: GetProductListParams): Promise<void> {
    this._productList = [];
    const response = await this._apiRequest.sendRequest({
      method: HttpMethod.GET,
      url: `/products?offset=${params.offset}&limit=${params.limit}`,
    });
    runInAction(() => {
      this._productList = response.data;
    });
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("page"),
    (page: any) => {
      const pageNumber = Number(page);
      const offset: number = (pageNumber - 1) * 9;
      this.getProductList({ limit: 9, offset: offset });
    }
  );

  private readonly _qsReaction: IReactionDisposer = reaction(
    () => rootStore.query.input,
    (input) => {
      this.getSearchProducts({ value: input });
    }
  );

  async getQuantity(): Promise<void> {
    const response = await this._apiRequest.sendRequest({
      method: HttpMethod.GET,
      url: `/products`,
    });
    runInAction(() => {
      this._quantity = response.data.length;
    });
  }

  async getSearchProducts(params: GetSearchProductsParams): Promise<void> {
    const response = await this._apiRequest.sendRequest({
      method: HttpMethod.GET,
      url: `/products/?title=${params.value}`,
    });
    runInAction(() => {
      this._productList = response.data;
    });
  }
  destroy(): void {}
}
