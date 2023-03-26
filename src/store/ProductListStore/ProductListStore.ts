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
    this._meta = Meta.success;
    this._productList = prodList;
  }

  setQuantity(prodLength: number) {
    this._quantity = prodLength;
  }

  setCategoryList(catList: CategoryModel[]) {
    this._categoryList = catList;
  }

  async getProductList(params: GetProductListParams): Promise<void> {
    let offset = (params.page! - 1) * ITEMS_LIMIT;
    if (isNaN(offset)) {
      offset = 0;
    }
    this._meta = Meta.loading;
    this._productList = [];
    let urlProducts = `/products?offset=${offset}&limit=${ITEMS_LIMIT}`;
    let urlQuantity = `/products?`;
    if (params.value) {
      urlProducts += `&title=${params.value}`;
      urlQuantity += `&title=${params.value}`;
    }
    if (params.categoryId) {
      urlProducts += `&categoryId=${params.categoryId}`;
      urlQuantity += `&categoryId=${params.categoryId}`;
    }
    if (params.priceRange) {
      if (params.priceRange[0] === 0) {
        params.priceRange[0] = 1;
      }
      urlProducts += `&price_min=${params.priceRange[0]}&price_max=${params.priceRange[1]}`;
      urlQuantity += `&price_min=${params.priceRange[0]}&price_max=${params.priceRange[1]}`;
    }
    const response = await this._apiRequest.sendRequest(urlProducts);
    const quantity = await this._apiRequest.sendRequest(urlQuantity);
    const products: ProductModel[] = response.data.map(normalizeProduct);
    this.setProductList(products);
    this.setQuantity(quantity.data.length);
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => Number(rootStore.query.getParam("page")),
    (page: number) => {
      const value = String(rootStore.query.getParam("query"));
      const categoryId = Number(rootStore.query.getParam("categoryId"));
      const priceRange = [
        Number(rootStore.query.getParam("price_min")),
        Number(rootStore.query.getParam("price_max")),
      ];
      if (page) {
        this.getProductList({ page, value, categoryId, priceRange });
      }
    }
  );

  async getCategoryList() {
    const response = await this._apiRequest.sendRequest(`/categories`);
    const categories = response.data.map(normalizeCategory);
    this.setCategoryList(categories);
  }

  destroy(): void {
    this._qpReaction();
  }
}
