export interface IOneProductStore {
  id: string;
  getOneProduct(id: string): Promise<void>;
}

export type GetRelatedItemsParams = {
  id: string | undefined;
};
