import { AxiosResponse, RawAxiosRequestHeaders } from "axios";
import {
  AuthUserParams,
  CreateUserParams,
} from "store/RootStore/UserStore/types";

export interface IApiRequest {
  sendRequest: (
    url: string,
    headers?: RawAxiosRequestHeaders
  ) => Promise<AxiosResponse>;
  sendPostRequest: (
    url: string,
    params: CreateUserParams | AuthUserParams
  ) => Promise<AxiosResponse>;
}
