export enum TypeTonality {
  any = "Любая",
  positive = "Позитивная",
  negative = "Негативная",
}

export interface IData {
  date: string
  value: number
}


export interface IDataResponse {
  data: IData[]
  histogramType: string
}


export interface IHistogramResponse {
  data: IDataResponse[] | null
}

export interface ISource {
  id: number
  groupId: number
  name: string
  categoryId: number
  levelId: number
}

export interface IContent {
  markup: string
}

export interface IAttributes {
  isTechNews: boolean
  isAnnouncement: boolean
  isDigest: boolean
  influence: number
  wordCount: number
  coverage: any
}

export interface ITitle {
  text: string
  markup: string
}

export interface IScanDoc {
  schemaVersion: string
  id: string
  version: number
  issueDate: string,
  url: string
  source: ISource
  dedupClusterId: string
  title: ITitle
  content: IContent
  entities: any
  attributes: IAttributes
  language: string
}


export interface IFail {
  errorCode: number
  errorMessage: string
}

export interface IDocument {
  ok: IScanDoc
  // fail: IFail
}


