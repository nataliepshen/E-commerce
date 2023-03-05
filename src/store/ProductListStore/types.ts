export type GetProductListParams = {
  limit?: number;
  offset?: number;
  value?: string;
};

export interface IProductListStore {
  getProductList(params: GetProductListParams): Promise<void>;
  getQuantity(): Promise<void>;
}

export type GetSearchProductsParams = {
  value: string;
};
