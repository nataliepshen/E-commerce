export type CategoryApi = {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};

export type CategoryModel = {
  id: string;
  name: string;
  image: string;
  creationAt: Date;
  updatedAt: Date;
};
