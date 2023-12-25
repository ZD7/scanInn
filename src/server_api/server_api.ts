import { IAuthResponse, IAuthRequest } from "../types/types";
import { instanceScan } from "./instance";

export const authAPI = {
  auth(payload: IAuthRequest) {
    const promise = instanceScan.post<IAuthResponse>("account/login", payload);
    return promise;
  },
  getAccountInfo() {
    const promise = instanceScan.get("account/info");
    return promise;
  },
};



