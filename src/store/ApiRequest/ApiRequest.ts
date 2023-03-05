import axios from "axios";

import { IApiRequest, SendRequestParams } from "./types";

export default class ApiRequest implements IApiRequest {
  baseURL: string;
  constructor(baseUrl: string) {
    this.baseURL = baseUrl;
  }
  sendRequest = async (params: SendRequestParams) => {
    const instance = axios.create({
      baseURL: this.baseURL,
    });
    const response = await instance(params);
    return response;
  };
}
