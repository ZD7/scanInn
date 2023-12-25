import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHistogram } from "../../types/types";

const initState: IHistogram = {
  issueDateInterval: {
    startDate: "2007-01-01T00:00:00+03:00",
    endDate: "2023-12-10T23:59:59+03:00",
  },
  searchContext: {
    targetSearchEntitiesContext: {
      targetSearchEntities: [
        {
          type: "company",
          sparkId: null,
          entityId: null,
          inn: "7708004767",
          maxFullness: true,
          inBusinessNews: true,
        },
      ],
      onlyMainRole: true,
      tonality: "any",
      onlyWithRiskFactors: false,
      riskFactors: {
        and: [],
        or: [],
        not: [],
      },
      themes: {
        and: [],
        or: [],
        not: [],
      },
    },
    themesFilter: {
      and: [],
      or: [],
      not: [],
    },
  },
  searchArea: {
    includedSources: [],
    excludedSources: [],
    includedSourceGroups: [],
    excludedSourceGroups: [],
  },
  attributeFilters: {
    excludeTechNews: true,
    excludeAnnouncements: true,
    excludeDigests: true,
  },
  similarMode: "duplicates",
  limit: 1000,
  sortType: "issueDate",
  sortDirectionType: "asc",
  intervalType: "month",
  histogramTypes: ["totalDocuments", "riskFactors"],
};

const slice = createSlice({
  name: "settings",
  initialState: initState,
  reducers: {
    setStartDate: (state, action: PayloadAction<{ startDate: string }>) => {
      state.issueDateInterval.startDate = action.payload.startDate;
    },
    setEndDate: (state, action: PayloadAction<{ endDate: string }>) => {
      state.issueDateInterval.endDate = action.payload.endDate;
    },
    setInn: (state, action: PayloadAction<{ inn: string }>) => {
      state.searchContext.targetSearchEntitiesContext.targetSearchEntities[0]!.inn =
        action.payload.inn;
    },
    setLimitPublic: (state, action: PayloadAction<{ limit: number }>) => {
      state.limit = action.payload.limit;
    },
    setTonality: (state, action: PayloadAction<{ tonality: string }>) => {
      state.searchContext.targetSearchEntitiesContext.tonality =
        action.payload.tonality;
    },
    setMaxFullness: (state) => {
      state.searchContext.targetSearchEntitiesContext.targetSearchEntities[0]!.maxFullness =
        !state.searchContext.targetSearchEntitiesContext
          .targetSearchEntities[0]!.maxFullness;
    },
    setInBusinessNews: (state) => {
      state.searchContext.targetSearchEntitiesContext.targetSearchEntities[0]!.inBusinessNews =
        !state.searchContext.targetSearchEntitiesContext
          .targetSearchEntities[0]!.inBusinessNews;
    },
    setOnlyMainRole: (state) => {
      state.searchContext.targetSearchEntitiesContext.onlyMainRole =
        !state.searchContext.targetSearchEntitiesContext.onlyMainRole;
    },
    setOnlyWithRiskFactors: (state) => {
      state.searchContext.targetSearchEntitiesContext.onlyWithRiskFactors =
        !state.searchContext.targetSearchEntitiesContext.onlyWithRiskFactors;
    },
    setExcludeTechNews: (state) => {
      state.attributeFilters.excludeTechNews =
        !state.attributeFilters.excludeTechNews;
    },
    setExcludeAnnouncements: (state) => {
      state.attributeFilters.excludeAnnouncements =
        !state.attributeFilters.excludeAnnouncements;
    },
    setExcludeDigests: (state) => {
      state.attributeFilters.excludeDigests =
        !state.attributeFilters.excludeDigests;
    },
  },
});

// reducer
export const settingsReducer = slice.reducer;

// actions
export const {
  setStartDate,
  setEndDate,
  setInn,
  setLimitPublic,
  setTonality,
  setMaxFullness,
  setInBusinessNews,
  setOnlyMainRole,
  setOnlyWithRiskFactors,
  setExcludeTechNews,
  setExcludeAnnouncements,
  setExcludeDigests,
} = slice.actions;
