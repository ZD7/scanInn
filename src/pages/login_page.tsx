import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import icon_google from "../images/icon-google.svg";
import icon_yandex from "../images/icon-yandex.svg";
import icon_facebook from "../images/icon-facebook.svg";
import main_login_image from "../images/main-login-image.svg";
import icon_login from "../images/icon-login.svg";
import { authAPI } from "../server_api/server_api";
import { AppRootStoreType } from "../store/store";
import { useNavigate } from "react-router-dom";
import { setIsLogin, setIsAuthError } from "../store/reducers/auth_reducer";

interface IProps {}

const LoginPage: FC<IProps> = () => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");

  const [formValid, setFormValid] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [passError, setPassError] = useState("");

  const [validAuth, setValidAuth] = useState(true);

  const isLogin = useSelector<AppRootStoreType, boolean>(
    (state) => state.auth.isLogin
  );

  const navigate = useNavigate();

  useEffect(() => {
    isLogin && navigate("/search");
  }, [isLogin]);

  const loginIn = (e) => {
    e.preventDefault();
    authAPI
      .auth({ login, password: pass })
      .then((res) => {
        console.log("data", res.data);

        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.expire);

        dispatch(setIsLogin({ isLogin: true }));
        dispatch(setIsAuthError({ isAuthError: false }));
      })
      .catch((err) => {
        setValidAuth(false);
      });
  };

  const loginHandler = (e) => {
    setLogin(e.target.value);
    if (!e.target.value) {
      setLoginError("login не может быть пустым");
    } else {
      setLoginError("");
      pass ? setFormValid(true) : setFormValid(false);
    }
  };

  const passHandler = (e) => {
    setPass(e.target.value);
    if (!e.target.value) {
      setPassError("пароль не может быть пустым");
    } else {
      setPassError("");
      login ? setFormValid(true) : setFormValid(false);
    }
  };

  return (
    <Container>
      <Title>
        Для оформления подписки на тариф, необходимо авторизоваться.
      </Title>
      <div className="main-image">
        <img src={main_login_image} alt="main_login_image" />
      </div>
      {/* </LeftBlock> */}
      <Form className="request">
        <img src={icon_login} alt="main_login_image" className="icon_login" />
        <HeaderBlock>
          <button className="login" disabled>
            Войти
          </button>
          <button className="auth" disabled>
            Зарегистрироваться
          </button>
        </HeaderBlock>

        <label className="tel">
          Логин или номер телефона:
          {loginError && <div className="error">{loginError}</div>}
          <input
            type="text"
            value={login}
            onChange={(e) => loginHandler(e)}
            onBlur={(e) => loginHandler(e)}
          />
        </label>

        <label className="pass">
          Пароль:
          {passError && <div className="error">{passError}</div>}
          <input
            type="password"
            value={pass}
            onChange={(e) => passHandler(e)}
            onBlur={(e) => passHandler(e)}
          />
        </label>

        <Block>
          <ButtonLogin
            // disabled={loginError || passError ? true : false }
            disabled={!formValid}
            onClick={loginIn}
          >
            Войти
          </ButtonLogin>

          {!validAuth && (
            <div className="error">
              Пользователь не существует или введён неверный пароль
            </div>
          )}
        </Block>

        <button className="restore-pass">Восстановить пароль</button>

        <LoginUse>
          <div>Войти через:</div>
          <div className="login-use-app">
            <button>
              <img src={icon_google} alt="icon_google" />
            </button>
            <button>
              <img src={icon_yandex} alt="icon_google" />
            </button>
            <button>
              <img src={icon_facebook} alt="icon_google" />
            </button>
          </div>
        </LoginUse>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  height: 557px;
  max-width: max-content;
  align-items: flex-start;
  padding-left: 60px;
  padding-top: 69px;
  padding-bottom: 80px;

  .main-image {
    padding-left: 112px;
    width: max-content;
  }

  @media screen and (max-width: 600px) {
    flex-wrap: nowrap;
    height: max-content;

    align-items: center;

    padding-left: 14px;
    padding-right: 14px;
    padding-top: 31px;

    .resize-image {
      height: 426px;
      width: 350px;
      object-fit: cover;
      object-position: 0 0;
    }

    .main-image {
      order: 2;
      padding-left: 0px;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  width: 429px;
  height: 557px;
  border-radius: 10px;

  box-shadow: 0px 0px 20px 0px #00000026;
  padding: 25px 25px 39px 25px;
  position: relative;

  .icon_login {
    position: absolute;
    top: -55px;
    left: -51px;
  }

  div:nth-last-child(1) {
    align-self: flex-start;
  }

  label {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;

    font-family: "InterRegular";

    font-size: 16px;
    line-height: 19px;
    color: #949494;
    position: relative;

    &.tel {
      margin-bottom: 20px;
    }

    &.pass {
      margin-bottom: 30px;
    }

    & .error {
      position: absolute;
      color: #ff5959;
      top: 83px;
      text-align: center;
      width: 100%;

      font-family: "InterRegular";
      font-size: 14px;
      line-height: 17px;
    }
  }

  input {
    width: 100%;
    height: 43px;
    border-radius: 5px;
    border: 1px solid #c7c7c7;
    box-shadow: 0px 0px 20px 0px #0000000d;
    text-align: left;

    box-sizing: border-box;
    padding-left: 19px;
    font-family: "InterRegular";
    font-size: 16px;
  }

  .restore-pass {
    font-family: "InterRegular";
    font-size: 14px;
    line-height: 17px;
    color: #5970ff;
    border-bottom: 1px solid #5970ff;
    margin-bottom: 30px;
  }

  @media screen and (max-width: 600px) {
    width: 347px;
    order: 1;
    margin-bottom: 49px;

    flex-direction: column;

    .icon_login {
      top: -81px;
      left: 81px;
    }
  }
`;

const HeaderBlock = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;

  font-family: "InterRegular";
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 40px;

  button {
    height: 29px;
    text-align: center;
    box-sizing: border-box;
    cursor: not-allowed;

    &.login {
      width: 151px;
      border-bottom: 2px solid var(--primary-color);
      color: var(--primary-color);
    }

    &.auth {
      width: 213px;
      border-bottom: 2px solid #c7c7c7;
      color: #c7c7c7;
    }
  }
`;

const Block = styled.div`
  position: relative;
  width: 100%;

  margin-bottom: 49px;

  & .error {
    position: absolute;
    color: #ff5959;
    top: 65px;
    text-align: center;
    font-family: "InterRegular";
    font-size: 14px;
    line-height: 17px;
  }
`;

const ButtonLogin = styled.button`
  width: 100%;
  height: 59px;
  border-radius: 5px;
  background-color: var(--bg-color1);
  color: var(--primary-color3);
  font-family: "InterMedium";
  font-size: 22px;
  line-height: 27px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const LoginUse = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;

  font-family: "InterRegular";
  font-size: 16px;
  line-height: 19px;
  color: #949494;

  .login-use-app {
    display: flex;
    gap: 10px;
    height: 31px;
  }
`;

const Title = styled.div`
  width: 817px;
  height: 144px;

  font-family: "Roboto";
  font-size: 40px;
  line-height: 48px;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.02em;

  @media screen and (max-width: 600px) {
    font-size: 22px;
    line-height: 26px;
    height: 104px;
    width: 375px;
    padding-left: 14px;
    padding-right: 14px;
    box-sizing: border-box;
    margin-bottom: 126px;
  }
`;

export default LoginPage;
