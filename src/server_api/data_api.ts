import { instanceScan } from "./instance"
import { IHistogram, IIdDocument } from "../types/types";
import {  IDocument } from "../types/response_types"

export const dataAPI = {
  getData(payload: IHistogram) {
    const promise = instanceScan.post<IHistogram>("objectsearch/histograms", payload);
    return promise
  },
  getIdDocument(payload: IHistogram) {
    const promise = instanceScan.post<IIdDocument>("objectsearch", payload);
    return promise
  },
  getDocument(payload: IResponseDocument) {
    const promise = instanceScan.post<IDocument[]>("documents", payload);
    return promise
  },
}

export interface IResponseDocument {
  ids: string[]
}
