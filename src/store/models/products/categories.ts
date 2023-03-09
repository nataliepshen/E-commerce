export type CategoryApi = {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  uodatedAt: string;
};

export type CategoryModel = {
  id: number;
  name: string;
};

export const normalizeCategory = (from: CategoryApi): CategoryModel => ({
  id: from.id,
  name: from.name,
});
