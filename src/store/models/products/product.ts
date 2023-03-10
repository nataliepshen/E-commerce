import { CategoryApi, CategoryModel } from "../categories";

export type ProductApi = {
  id: number;
  title: string;
  images: string[];
  category: CategoryApi;
  description: string;
  price: number;
  creationAt: string;
  updatedAt: string;
};

export type ProductModel = {
  id: number;
  images: string[];
  title: string;
  description: string;
  category: CategoryModel;
  price: number;
  creationAt: Date;
  updatedAt: Date;
};
