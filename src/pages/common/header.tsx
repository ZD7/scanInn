import styled from "styled-components";
import React, { FC, useEffect, useState, useRef } from "react";
import logo from "../../images/logo.svg";
import burger from "../../images/burger-menu.svg";
import icon_close_menu from "../../images/icon-close-memu.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLogin,
  setIsAuthError,
  getAccountInfo,
} from "../../store/reducers/auth_reducer";
import { AppRootStoreType } from "../../store/store";
import { authAPI } from "../../server_api/server_api";
import { IEventFiltersInfo } from "../../types/request_types";
import Preloader from "../common/preloader";
import logo_footer from "../../images/logo-footer.svg";
import { useAuth } from "../../hooks/useAuth";

interface IProps {}

const Header: FC<IProps> = () => {
  const auth = useAuth();

  const elementRef: any = useRef(null);

  const isAuth = useSelector<AppRootStoreType, boolean>(
    (state) => state.auth.isLogin
  );

  const eventFiltersInfo = useSelector<AppRootStoreType, IEventFiltersInfo>(
    (state) => state.auth.eventFiltersInfo
  );

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isMenuBurger, setMenuBurger] = useState(false);

  console.log("isMenuBurger", isMenuBurger);

  console.log("isAuth", isAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(setIsLogin({ isLogin: false }));
    dispatch(setIsAuthError({ isAuthError: true }));
    isMenuBurger && setIsOpenMenu(!isOpenMenu);
    navigate("/login");
  };

  const login = () => {
    isMenuBurger && setIsOpenMenu(!isOpenMenu);
    navigate("/login");
  };

  useEffect(() => {
    if (isAuth) {
      authAPI.getAccountInfo().then((res) => {
        dispatch(getAccountInfo({ eventFiltersInfo: res.data }));
      });
    }
  }, [isAuth]);

  const [widthHeader, setWidthHeader] = useState(0);

  useEffect(() => {
    const myObserver = new ResizeObserver((entries) => {
      if (entries[0]!.contentRect.width >= 600) {
        setWidthHeader(entries[0]!.contentRect.width);

        {
          isOpenMenu && setIsOpenMenu(!isOpenMenu);
        }
        setMenuBurger(false);
      } else {
        setMenuBurger(true);
      }
    });
    myObserver.observe(elementRef.current);
  }, []);

  return (
    <Wrapper>
      <Container ref={elementRef} isOpenMenu={isOpenMenu}>
        {isOpenMenu ? (
          <img src={logo_footer} alt="icon-logo" />
        ) : (
          <img src={logo} alt="icon-logo" />
        )}
        <LeftBlock isOpenMenu={isOpenMenu}>
          <nav>
            <Ul isOpenMenu={isOpenMenu}>
              <li>
                <a href="/">Главная</a>
              </li>
              <li>
                <a href="#">Тарифы</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
            </Ul>
          </nav>
          {isAuth && (
            <AccountInfo isOpenMenu={isOpenMenu}>
              {eventFiltersInfo.usedCompanyCount !== null ? (
                <>
                  <div>
                    Использовано компаний
                    <span className="usedCompanyCount">
                      {eventFiltersInfo.usedCompanyCount}
                    </span>
                  </div>
                  <div className="custom">
                    Лимит по компаниям{" "}
                    <span className="companyLimit">
                      {eventFiltersInfo.companyLimit}
                    </span>
                  </div>
                </>
              ) : (
                <Preloader />
              )}
            </AccountInfo>
          )}

          <BlockAuth isOpenMenu={isOpenMenu}>
            {isAuth ? (
              <AccountUser isOpenMenu={isOpenMenu}>
                <div className="avatar-left-block">
                  <div>Денис З.</div>
                  <button onClick={logout}>Выйти</button>
                </div>
                <div className="avatar">ДЗ</div>
              </AccountUser>
            ) : (
              <AuthBlock>
                <button>Зарегистрироваться</button>
                <div className="divider"></div>
                <Login onClick={login}>Войти</Login>
              </AuthBlock>
            )}
          </BlockAuth>

          <BlockBurgerMenu
            onClick={() => {
              setIsOpenMenu(!isOpenMenu);
            }}
          >
            {isOpenMenu ? (
              <img src={icon_close_menu} alt="icon_close_menu" />
            ) : (
              <img src={burger} alt="icon_burger" />
            )}
          </BlockBurgerMenu>
        </LeftBlock>
      </Container>
      {isOpenMenu && <BurgerMenu />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const BlockBurgerMenu = styled.div`
  display: none;

  @media screen and (max-width: 600px) {
    display: flex;
    justify-content: center;
    margin-right: 26px;
    width: 30px;
  }
`;

const BurgerMenu = styled.div`
  display: none;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    height: 398px;
    background-color: var(--primary-color);
    position: absolute;

    top: 93px;
    width: 100%;
    z-index: 3;
  }
`;

const Container = styled.header<{ isOpenMenu: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* gap: 401px; */
  padding-left: 60px;
  padding-right: 60px;
  box-sizing: border-box;

  height: 93px;
  max-width: 1320px;
  background-color: ${(props) =>
    props.isOpenMenu ? "var(--primary-color)" : ""};

  @media screen and (max-width: 400px) {
    padding-left: 14px;
    padding-right: 0px;
  }
`;

const BlockAuth = styled.div<{ isOpenMenu: boolean }>`

  @media screen and (max-width: 600px) {
    position: absolute;
    top: 450px;
    display: ${(props) => (props.isOpenMenu ? "" : "none")};
    z-index: 4;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const LeftBlock = styled.div<{ isOpenMenu: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 778px;

  @media screen and (max-width: 800px) {
    width: max-content;
    nav {
      display: ${(props) => (props.isOpenMenu ? "" : "none")};
      top: 230px;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 4;
      position: absolute;
    }
  }
`;

const Ul = styled.ul<{ isOpenMenu: boolean }>`
  list-style: none;
  display: flex;
  flex-direction: ${(props) => (props.isOpenMenu ? "column" : "")};
  padding-left: ${(props) => (props.isOpenMenu ? "0" : "")};
  align-items: ${(props) => (props.isOpenMenu ? "center" : "")};
  gap: 49px;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;

  & a {
    text-decoration: none;

    color: #000000;

    color: ${(props) => (props.isOpenMenu ? "var(--text-color1)" : "#000000")};
  }
`;

const AuthBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(0, 0, 0, 0.4);
  gap: 20px;

  & .divider {
    width: 2px;
    height: 26px;
    background-color: #029491;
  }
`;

const Login = styled.button`
  background-color: #7ce3e1;
  color: #000000;
  border-radius: 5px;

  width: 65px;
height: 26px;

`;

const AccountInfo = styled.div<{ isOpenMenu: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  width: 175px;
  height: 63px;
  border-radius: 5px;
  font-family: "InterRegular";
  font-size: 10px;
  line-height: 12px;
  color: rgba(0, 0, 0, 0.3);

  background-color: ${(props) =>
    props.isOpenMenu ? "var(--text-color1)" : "rgba(217, 217, 217, 0.3)"};
  color: ${(props) =>
    props.isOpenMenu ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.3)"};

  span {
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    margin-left: 9px;
    vertical-align: middle;

    &.usedCompanyCount {
      color: #000000;
    }

    &.companyLimit {
      color: #8ac540;
    }
  }

  .custom {
    padding-left: 17px;
  }

  @media screen and (max-width: 600px) {
    width: 132px;
    height: 75px;
    font-size: 8px;
    line-height: 10px;
    padding-left: 10px;
    padding-right: 23px;
    box-sizing: border-box;
    margin-right: 31px;
  }
`;

const AccountUser = styled.div<{ isOpenMenu: boolean }>`
  display: flex;
  align-items: center;
  width: max-content;
  height: 32px;
  gap: 4px;
  color: ${(props) => (props.isOpenMenu ? "var(--text-color1)" : "")};

  font-family: "InterRegular";
  font-size: 14px;
  line-height: 17px;

  .avatar-left-block {
    display: flex;
    align-items: end;
    flex-direction: column;

    button {
      font-size: 10px;
      padding: 4px 10px 5px 12px;

      color: ${(props) =>
        props.isOpenMenu ? "var(--text-color1)" : "rgba(0, 0, 0, 0.4)"};
    }
  }

  .avatar {
    border-radius: 50%;
    background-color: #cbd5e1;
    width: 32px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default Header;
