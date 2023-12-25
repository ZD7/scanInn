export enum TypeTonality {
  any = "Любая",
  positive = "Позитивная",
  negative = "Негативная",
}

export interface IAuthResponse {
  accessToken: string;
  expire: string;
}

export interface IAuthRequest {
  login: string;
  password: string;
}

interface IDateInterval {
  startDate: string;
  endDate: string;
}

interface IAttributeFilters {
  excludeTechNews: boolean;
  excludeAnnouncements: boolean;
  excludeDigests: boolean;
}

interface ISearchArea {
  includedSources: [];
  excludedSources: [];
  includedSourceGroups: [];
  excludedSourceGroups: [];
}

interface ITargetSearchEntities {
  type: string;
  sparkId: number | null;
  entityId: number | null;
  inn: string;
  maxFullness: boolean;
  inBusinessNews: boolean;
}

interface IRiskFactors {
  and: [];
  or: [];
  not: [];
}

interface IThemes {
  and: [];
  or: [];
  not: [];
}

interface ITargetSearchEntitiesContext {
  targetSearchEntities: ITargetSearchEntities[];
  onlyMainRole: boolean;
  tonality: string;
  onlyWithRiskFactors: boolean;
  riskFactors: IRiskFactors;
  themes: IThemes;
}

interface IThemesFilter {
  and: [];
  or: [];
  not: [];
}

interface ISearchContext {
  targetSearchEntitiesContext: ITargetSearchEntitiesContext;
  themesFilter: IThemesFilter;
}

export interface IHistogram {
  issueDateInterval: IDateInterval;

  searchContext: ISearchContext;

  searchArea: ISearchArea;

  attributeFilters: IAttributeFilters;

  similarMode: string;
  limit: number;
  sortType: string;
  sortDirectionType: string;
  intervalType: string;
  histogramTypes: string[];
}


export interface ItemsDocument {
  encodedId: string
  influence: number
  similarCount: number
}

interface IMappings {
  inn: string
  entityIds: number[]
}

export interface IIdDocument {
  items: ItemsDocument[]
  mappings: IMappings[]
}