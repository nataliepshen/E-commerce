import { AxiosResponse } from "axios";

export interface IApiRequest {
  sendRequest: (url: string) => Promise<AxiosResponse>;
}
