import { AppRootStoreType } from "./store" 


export const settings = (state: AppRootStoreType) => state.settings


export const isLogin = (state: AppRootStoreType) => state.auth.isLogin


// const isAuth = useSelector<AppRootStoreType, boolean>(
//     (state) => state.auth.isLogin
//   );