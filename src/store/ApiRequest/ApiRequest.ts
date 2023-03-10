import axios, { AxiosInstance } from "axios";

import { IApiRequest } from "./types";

const BASE_URL = "https://api.escuelajs.co/api/v1";

export default class ApiRequest implements IApiRequest {
  private _instance: AxiosInstance;
  constructor() {
    this._instance = axios.create({
      baseURL: BASE_URL,
    });
  }
  sendRequest = async (url: string) => {
    const response = await this._instance.get(url);
    return response;
  };
}
