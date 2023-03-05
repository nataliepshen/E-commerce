export type GetOneProductParams = {
  id: string | undefined;
};

export interface IOneProductStore {
  getOneProduct(params: GetOneProductParams): Promise<void>;
}

export type GetRelatedItemsParams = {
  id: string | undefined;
};
