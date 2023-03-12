export type GetProductListParams = {
  page?: number;
  value?: string;
  categoryId?: number;
};

export interface IProductListStore {
  getProductList(params: GetProductListParams): Promise<void>;
  getCategoryList(): Promise<void>;
}
