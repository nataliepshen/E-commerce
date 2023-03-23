import { CategoryModel } from "store/models/categories";
import { ProductModel } from "store/models/products";

export type ProductInCart = {
  id: number;
  images: string[];
  title: string;
  description: string;
  category: CategoryModel;
  price: number;
  creationAt: Date;
  updatedAt: Date;
  quantity: number;
};

export interface ICartStore {}

export const normalizeProductToCart = (from: ProductModel): ProductInCart => ({
  id: from.id,
  images: from.images,
  title: from.title,
  description: from.description,
  category: from.category,
  price: from.price,
  creationAt: from.creationAt,
  updatedAt: from.updatedAt,
  quantity: 1,
});
