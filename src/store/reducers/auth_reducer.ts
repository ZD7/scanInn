import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IEventFiltersInfo, IInfoLimit } from  "../../types/request_types"

const initState: IAuthState = {
  isLogin: false,
  isAuthError: false,
  eventFiltersInfo: {usedCompanyCount : null, companyLimit: null}}

const slice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    setIsLogin: (state, action: PayloadAction<{ isLogin: boolean }>) => {
      state.isLogin = action.payload.isLogin
    },
    setIsAuthError: (state, action: PayloadAction<{ isAuthError: boolean }>) => {
      state.isAuthError = action.payload.isAuthError
    },
    getAccountInfo: (state, action: PayloadAction<{ eventFiltersInfo: IInfoLimit }>) => {
      state.eventFiltersInfo = action.payload.eventFiltersInfo.eventFiltersInfo
    }
  }
})

//reducer
export const authReducer = slice.reducer

//actions
export const { setIsLogin, setIsAuthError, getAccountInfo } = slice.actions

// types
export interface IAuthState {
  isLogin: boolean
  isAuthError: boolean
  eventFiltersInfo: IEventFiltersInfo
}