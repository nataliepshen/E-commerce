import { CategoryApi, CategoryModel, normalizeCategory } from "./categories";

export type ProductApi = {
  id: number;
  title: string;
  images: string[];
  category: CategoryApi;
  description: string;
  price: number;
  creationAt: string;
  uodatedAt: string;
};

export type ProductModel = {
  id: number;
  images: string[];
  title: string;
  description: string;
  category: CategoryModel;
  price: number;
};

export const normalizeProduct = (from: ProductApi): ProductModel => ({
  id: from.id,
  title: from.title,
  images: from.images,
  category: normalizeCategory(from.category),
  description: from.description,
  price: from.price,
});
