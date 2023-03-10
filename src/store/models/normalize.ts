import { CategoryApi, CategoryModel } from "./categories";
import { ProductApi, ProductModel } from "./products";

export const normalizeCategory = (from: CategoryApi): CategoryModel => ({
  id: String(from.id),
  name: from.name,
  image: from.image,
  creationAt: new Date(from.creationAt),
  updatedAt: new Date(from.updatedAt),
});

export const normalizeProduct = (from: ProductApi): ProductModel => ({
  id: from.id,
  title: from.title,
  images: from.images,
  category: normalizeCategory(from.category),
  description: from.description,
  price: from.price,
  creationAt: new Date(from.creationAt),
  updatedAt: new Date(from.updatedAt),
});
