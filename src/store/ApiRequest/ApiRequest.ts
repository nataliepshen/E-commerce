import axios, { AxiosInstance, RawAxiosRequestHeaders } from "axios";
import {
  AuthUserParams,
  CreateUserParams,
} from "store/RootStore/UserStore/types";

import { IApiRequest } from "./types";

const BASE_URL = "https://api.escuelajs.co/api/v1";

export default class ApiRequest implements IApiRequest {
  private _instance: AxiosInstance;
  constructor() {
    this._instance = axios.create({
      baseURL: BASE_URL,
    });
  }
  sendRequest = async (url: string, headers?: RawAxiosRequestHeaders) => {
    const response = await this._instance.get(url, { headers });
    return response;
  };

  sendPostRequest = async (
    url: string,
    params: CreateUserParams | AuthUserParams
  ) => {
    const response = await this._instance.post(url, params);
    return response;
  };
}
