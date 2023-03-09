export type GetProductListParams = {
  page?: number;
  value?: string;
};

export interface IProductListStore {
  getProductList(params: GetProductListParams): Promise<void>;
}
