import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./reducers/auth_reducer"
import { settingsReducer } from "./reducers/settings_reducer"
import { dataReducer } from "./reducers/data_reducer"

const rootReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  data: dataReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppRootStoreType = ReturnType<typeof rootReducer>

export default store