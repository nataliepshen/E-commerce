export type CategoryApi = {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  uodatedAt: string;
};

export type CategoryModel = {
  id: string;
  name: string;
};

export const normalizeCategory = (from: CategoryApi): CategoryModel => ({
  id: String(from.id),
  name: from.name,
});
