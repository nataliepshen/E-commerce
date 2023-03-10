import { CategoryModel } from "@store/models/categories";
import { normalizeCategory, normalizeProduct } from "@store/models/normalize";
import { ProductModel } from "@store/models/products";
import rootStore from "@store/RootStore/instance";
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

const ITEMS_LIMIT: number = 9;
export default class ProductListStore
  implements IProductListStore, ILocalStore
{
  private readonly _apiRequest = new ApiRequest();
  private _productList: ProductModel[] = [];
  private _quantity: number = 0;
  private _categoryList: CategoryModel[] = [];
  showFilter: boolean = false;

  constructor() {
    makeObservable<ProductListStore, PrivatFields>(this, {
      _productList: observable.ref,
      _quantity: observable,
      _categoryList: observable,
      showFilter: observable,
      productList: computed,
      quantity: computed,
      getProductList: action.bound,
      toggleFilter: action.bound,
      getCategoryList: action.bound,
    });
  }

  get productList(): ProductModel[] {
    return this._productList;
  }

  get quantity(): number {
    return this._quantity;
  }

  get categoryList(): CategoryModel[] {
    return this._categoryList;
  }

  toggleFilter = () => {
    this.showFilter = !this.showFilter;
  };

  async getProductList(params: GetProductListParams): Promise<void> {
    const offset = (params.page! - 1) * ITEMS_LIMIT;
    this._productList = [];
    let urlProducts = "";
    let urlQuantity = "";
    if (params.value) {
      urlProducts = `/products?title=${params.value}&offset=${offset}&limit=${ITEMS_LIMIT}`;
      urlQuantity = `/products/?title=${params.value}`;
    } else if (params.categoryId) {
      urlProducts = `/products/?categoryId=${params.categoryId}&offset=${offset}&limit=${ITEMS_LIMIT}`;
      urlQuantity = `/products/?categoryId=${params.categoryId}`;
    } else {
      urlProducts = `/products?offset=${offset}&limit=${ITEMS_LIMIT}`;
      urlQuantity = `/products`;
    }
    const response = await this._apiRequest.sendRequest(urlProducts);
    const quantity = await this._apiRequest.sendRequest(urlQuantity);
    runInAction(() => {
      this._productList = response.data.map(normalizeProduct);
      this._quantity = quantity.data.length;
    });
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => Number(rootStore.query.getParam("page")),
    (page: number) => {
      const value = String(rootStore.query.getParam("query"));
      const categoryId = Number(rootStore.query.getParam("categoryId"));
      this.getProductList({ page, value, categoryId });
    }
  );

  async getCategoryList() {
    const response = await this._apiRequest.sendRequest(`/categories`);
    runInAction(() => {
      this._categoryList = response.data.map(normalizeCategory);
    });
  }

  destroy(): void {
    this._qpReaction();
  }
}
