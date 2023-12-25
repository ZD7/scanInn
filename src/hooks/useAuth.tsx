import { useDispatch, useSelector } from "react-redux";
import { AppRootStoreType } from "../store/store";
import { useEffect } from "react";
import { setIsLogin } from "../store/reducers/auth_reducer";

import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector<AppRootStoreType, boolean>(
    (state) => state.auth.isLogin
  );
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");
    if (refreshToken && accessToken) {
      dispatch(setIsLogin({ isLogin: true }));
    } else {
      navigate("/");
    }
  }, [isLogin]);
};
