import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemsDocument } from "../../types/types";
import { IDocument, IScanDoc } from "../../types/response_types";

const initState: IDataState = {
  idDocuments: [],
  documentsChunk: [],
  documents: [],
};

const slice = createSlice({
  name: "data",
  initialState: initState,
  reducers: {
    getIdDocument: (state, action: PayloadAction<{ id: ItemsDocument[] }>) => {
      state.idDocuments = action.payload.id.map((obj) => obj.encodedId);
    },
    getDocumentChunk: (state, action: PayloadAction<{ documentsChunk: IDocument[] }>) => {
      const newArray = action.payload.documentsChunk.map(({ ok }) => ok);
      state.documentsChunk = [...state.documentsChunk, ...newArray];
    },

    getDocument: (state) => {
      state.documents = state.documentsChunk;
    },
  },
});

//reducer
export const dataReducer = slice.reducer;

//actions
export const { getIdDocument, getDocumentChunk, getDocument } = slice.actions;

// types
export interface IDataState {
  idDocuments: string[];
  documentsChunk: IScanDoc[];
  documents: IScanDoc[];
}
