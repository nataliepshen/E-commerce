import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
} from "mobx";
import { CategoryModel } from "store/models/categories";
import { normalizeCategory, normalizeProduct } from "store/models/normalize";
import { ProductModel } from "store/models/products";
import rootStore from "store/RootStore/instance";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";

import { GetProductListParams, IProductListStore } from "./types";
import ApiRequest from "../ApiRequest";

type PrivatFields = "_productList" | "_quantity" | "_meta" | "_categoryList";

const ITEMS_LIMIT: number = 9;
export default class ProductListStore
  implements IProductListStore, ILocalStore
{
  private readonly _apiRequest = new ApiRequest();
  private _productList: ProductModel[] = [];
  private _quantity: number = 0;
  private _meta: Meta = Meta.initial;
  private _categoryList: CategoryModel[] = [];
  showFilter: boolean = false;

  constructor() {
    makeObservable<ProductListStore, PrivatFields>(this, {
      _productList: observable.ref,
      _quantity: observable,
      _meta: observable,
      _categoryList: observable.ref,
      showFilter: observable,
      productList: computed,
      quantity: computed,
      meta: computed,
      categoryList: computed,
      setProductList: action.bound,
      setQuantity: action.bound,
      toggleFilter: action.bound,
      setCategoryList: action.bound,
      getProductList: action.bound,
      getCategoryList: action.bound,
    });
  }

  get productList(): ProductModel[] {
    return this._productList;
  }

  get quantity(): number {
    return this._quantity;
  }

  get meta(): Meta {
    return this._meta;
  }

  get categoryList(): CategoryModel[] {
    return this._categoryList;
  }

  toggleFilter = () => {
    this.showFilter = !this.showFilter;
  };

  setProductList(prodList: ProductModel[]) {
    this._productList = prodList;
  }

  setQuantity(prodLength: number) {
    this._quantity = prodLength;
  }

  setCategoryList(catList: CategoryModel[]) {
    this._categoryList = catList;
  }

  async getProductList(params: GetProductListParams): Promise<void> {
    const offset = (params.page! - 1) * ITEMS_LIMIT;
    this._meta = Meta.loading;
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
    this._meta = Meta.success;
    const products: ProductModel[] = response.data.map(normalizeProduct);
    /* Вот тут был runInAction, который терял контекст видимо */
    this.setProductList(products);
    this.setQuantity(quantity.data.length);
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => Number(rootStore.query.getParam("page")),
    (page: number) => {
      const value = String(rootStore.query.getParam("query"));
      const categoryId = Number(rootStore.query.getParam("categoryId"));
      if (page) {
        this.getProductList({ page, value, categoryId });
      }
    }
  );

  async getCategoryList() {
    const response = await this._apiRequest.sendRequest(`/categories`);
    const categories = response.data.map(normalizeCategory);
    /* Вот тут был runInAction, который терял контекст видимо */
    this.setCategoryList(categories);
  }

  destroy(): void {
    this._qpReaction();
  }
}
