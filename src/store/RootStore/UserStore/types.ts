export type CreateUserParams = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export interface IUserStore {
  createUser(params: CreateUserParams): Promise<void>;
}

export type AuthUserParams = {
  email: string;
  password: string;
};

export type Order = {
  number: number;
  date: Date;
  status: string;
  products: string[];
  totalAmount: number;
};

// export type UpdateUserParams = {
//   name?: string;
//   email?: string;
// };
