import {
  CategoryModel,
  normalizeCategory,
  normalizeProduct,
  ProductModel,
} from "@store/models/products";
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

type PrivatFields = "_productList" | "_quantity" | "_categoryList";

const BaseURL = "https://api.escuelajs.co/api/v1";

export default class ProductListStore
  implements IProductListStore, ILocalStore
{
  private readonly _apiRequest = new ApiRequest(BaseURL);
  private _productList: ProductModel[] = [];
  private _quantity: number = 0;
  private _categoryList: CategoryModel[] = [];
  showFilter: boolean = false;
  categoryIsSelected: boolean = false;

  constructor() {
    makeObservable<ProductListStore, PrivatFields>(this, {
      _productList: observable.ref,
      _quantity: observable,
      _categoryList: observable,
      showFilter: observable,
      categoryIsSelected: observable,
      productList: computed,
      quantity: computed,
      currentPage: computed,
      getProductList: action,
      toggleFilter: action,
      getCategoryList: action,
      selectCategory: action,
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

  get categoryList(): CategoryModel[] {
    return this._categoryList;
  }

  toggleFilter = () => {
    this.showFilter = !this.showFilter;
  };

  selectCategory = () => {
    this.categoryIsSelected = !this.categoryIsSelected;
  };

  async getProductList(params: GetProductListParams): Promise<void> {
    const limit = 9;
    const offset = (params.page! - 1) * limit;
    this._productList = [];
    let urlProducts = "";
    let urlQuantity = "";
    if (params.value) {
      urlProducts = `/products?title=${params.value}&offset=${offset}&limit=${limit}`;
      urlQuantity = `/products/?title=${params.value}`;
    } else if (params.categoryId) {
      urlProducts = `/products/?categoryId=${params.categoryId}&offset=${offset}&limit=${limit}`;
      urlQuantity = `/products/?categoryId=${params.categoryId}`;
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
      const categoryId = Number(rootStore.query.getParam("categoryId"));
      this.getProductList({ page, value, categoryId });
    }
  );

  async getCategoryList() {
    const response = await this._apiRequest.sendRequest({
      method: HttpMethod.GET,
      url: `/categories`,
    });
    runInAction(() => {
      this._categoryList = response.data.map(normalizeCategory);
    });
  }

  destroy(): void {}
}