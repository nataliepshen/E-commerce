import { action, computed, makeObservable, observable } from "mobx";
import ApiRequest from "store/ApiRequest";
import { normalizeUser } from "store/models/normalize";
import { UserApi, UserModel } from "store/models/users";
import { ILocalStore } from "utils/useLocalStore";

import { AuthUserParams, CreateUserParams, IUserStore, Order } from "./types";
import { ProductInCart } from "../CartStore/types";

export type PrivatFields = "_user" | "_orderList" | "_discount";

export default class UserStore implements IUserStore, ILocalStore {
  private readonly _apiRequest = new ApiRequest();
  private _user: UserModel | null = null;
  private _orderList: Order[] = [];
  private _discount: number | null = this.getDiscount();
  token: string | null = this.getToken();
  isSignIn: boolean = true;
  isRegister: boolean = false;
  isFailed: boolean = false;

  constructor() {
    makeObservable<UserStore, PrivatFields>(this, {
      _user: observable,
      _orderList: observable,
      _discount: observable,
      token: observable,
      isSignIn: observable,
      isRegister: observable,
      isFailed: observable,
      user: computed,
      orderList: computed,
      setFailed: action.bound,
      onSignIn: action.bound,
      onRegister: action.bound,
      getToken: action.bound,
      setToken: action.bound,
      setDiscount: action.bound,
      getDiscount: action.bound,
      setUser: action.bound,
      createUser: action.bound,
      authUser: action.bound,
      getUserWithToken: action.bound,
      logOut: action.bound,
      addOrder: action.bound,
    });
  }

  setFailed(bool: boolean) {
    this.isFailed = bool;
  }

  onSignIn = () => {
    this.isSignIn = true;
    this.isRegister = false;
    this.setFailed(false);
  };
  onRegister = () => {
    this.isRegister = true;
    this.isSignIn = false;
    this.setFailed(false);
  };

  get user(): UserModel | null {
    return this._user;
  }

  get orderList(): Order[] {
    return this._orderList;
  }

  get discount(): number | null {
    return this._discount;
  }

  setUser(user: UserApi): void {
    this._user = normalizeUser(user);
  }

  setToken(token: string | null): void {
    this.token = token;
  }

  getToken(): string | null {
    const userToken = localStorage.getItem("token");
    return userToken;
  }

  setDiscount(discount: number): void {
    this._discount = discount;
    localStorage.setItem("userDiscount", discount.toString());
  }

  getDiscount(): number | null {
    const discount = localStorage.getItem("userDiscount");
    if (discount === undefined || discount === null) return null;
    return Number(discount);
  }

  async createUser(params: CreateUserParams): Promise<void> {
    try {
      const response = await this._apiRequest.sendPostRequest(`/users`, params);
      this.setUser(response.data);
      this.authUser({ email: params.email, password: params.password });
    } catch (error: any) {
      if (error.response.status === 400) {
        this.setFailed(true);
      }
    }
  }

  async authUser(params: AuthUserParams): Promise<void> {
    try {
      const authResponse = await this._apiRequest.sendPostRequest(
        `auth/login`,
        {
          email: params.email,
          password: params.password,
        }
      );
      const userToken: string = authResponse.data.access_token;
      localStorage.setItem("token", userToken);
      this.setToken(userToken);
    } catch (error: any) {
      if (error.response.status === 401) {
        this.setFailed(true);
      }
    }
  }

  async getUserWithToken(userToken: string): Promise<void> {
    try {
      const response = await this._apiRequest.sendRequest(`/auth/profile`, {
        Authorization: `Bearer ${userToken}`,
      });
      this.setUser(response.data);
    } catch (error: any) {
      if (error.response.status === 400) {
        this.setToken(null);
        localStorage.removeItem("token");
      }
    }
  }

  logOut() {
    this._user = null;
    this.token = null;
    localStorage.removeItem("token");
  }

  addOrder(productList: ProductInCart[], totalSum: number) {
    const number = Math.floor(Math.random() * (195999 - 20001 + 1)) + 20001;
    const date = new Date();
    const status = "In processing";
    const products = productList.map((item) => item.images[0]);
    this._orderList.unshift({
      number: number,
      date: date,
      status: status,
      products: products,
      totalAmount: totalSum,
    });
  }

  destroy(): void {}
}
