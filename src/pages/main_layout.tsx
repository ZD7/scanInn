import styled from "styled-components";
import image_top_block from "../images/image-top-block.svg";
import image_center_block from "../images/image_center_block.svg";
import business_rate_icon from "../images/business-rate-icon.svg";
import beginer_rate_icon from "../images/beginer-rate-icon.svg";
import pro_rate_icon from "../images/pro-rate-icon.svg";
import check_icon from "../images/check.svg";
import { useSelector } from "react-redux";
import { AppRootStoreType } from "../store/store";
import { useNavigate } from "react-router-dom";
import icon_high_processing from "../images/icon-high-processing.svg";
import icon_objective_response from "../images/icon-objective-response.svg";
import icon_protecting from "../images/icon-protecting.svg";
import Slider from "react-slick";
import { PrevArrow, NextArrow } from "../helpers/custom_arrows_slider";

const MainLayout = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1290,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const isLogin = useSelector<AppRootStoreType, boolean>(
    (state) => state.auth.isLogin
  );

  const navigate = useNavigate();

  const advantages = [
    {
      content: "Высокая и оперативная скорость обработки заявки",
      icon: icon_high_processing,
    },
    {
      content:
        "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
      icon: icon_objective_response,
    },
    {
      content:
        "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
      icon: icon_protecting,
    },
    {
      content: "Высокая и оперативная скорость обработки заявки",
      icon: icon_high_processing,
    },
    {
      content:
        "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
      icon: icon_objective_response,
    },
    {
      content:
        "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
      icon: icon_protecting,
    },
    {
      content: "Высокая и оперативная скорость обработки заявки",
      icon: icon_high_processing,
    },
    {
      content:
        "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
      icon: icon_objective_response,
    },
    {
      content:
        "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
      icon: icon_protecting,
    },
  ];

  return (
    <Container>
      <TopBlock>
        <Right>
          <Title>сервис по поиску публикаций о компании по его ИНН</Title>
          <TitleInfo>
            Комплексный анализ публикаций, получение данных в формате PDF на
            электронную почту.
          </TitleInfo>
          {isLogin && (
            <RequestData onClick={() => navigate("/search")}>
              Запросить данные
            </RequestData>
          )}
        </Right>
        <div className="image-top-block">
          <img src={image_top_block} alt="top-block" />
        </div>
      </TopBlock>

      <WrapperSlider>
        <div className="title-slider">Почему именно мы</div>
        <ContainerSlider>
          <Slider {...settings}>
            {advantages.map((option, index) => (
              <OptionItem key={index}>
                <img
                  src={option.icon}
                  alt="icon-slider"
                  className="icon-slider"
                />
                <div>{option.content}</div>
              </OptionItem>
            ))}
          </Slider>
        </ContainerSlider>
      </WrapperSlider>
      <div className="resize-image">
        <img src={image_center_block} alt="center-block" />
      </div>
      <BlockRate>
        <div className="header-block-rate">Наши тарифы</div>
        <BlockCardRate>
          <Card className="current_rate">
            <CardHeader className="begginer">
              <div>
                <TitleCard>Beginner</TitleCard>
                <div className="sub-title">Для небольшого исследования</div>
              </div>
              <img
                className="icon-card"
                src={beginer_rate_icon}
                alt="beginer-rate-icon"
              />
            </CardHeader>
            <CardContent>
              <PriceBlock>
                <Price>
                  799 ₽<span>1 200 ₽</span>
                </Price>

                <div className="price-info">
                  или 150 ₽/мес. при рассрочке на 24 мес.
                </div>
              </PriceBlock>
              <div className="current-rate">текущий</div>
              <div className="option-rate">В тариф входят:</div>
              <ul>
                <li>
                  <img src={check_icon} alt="check_icon" />
                  Безлимитная история запросов
                </li>
                <li>
                  <img src={check_icon} alt="check_icon" />
                  Безопасная сделка
                </li>
                <li>
                  <img src={check_icon} alt="check_icon" />
                  Поддержка 24/7
                </li>
              </ul>
              <RequestData className="card">Подробнее</RequestData>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pro">
              <div>
                <TitleCard>Pro</TitleCard>
                <div className="sub-title">Для HR и фрилансеров</div>
              </div>
              <img
                className="icon-card"
                src={pro_rate_icon}
                alt="pro-rate-icon"
              />
            </CardHeader>
            <CardContent>
              <PriceBlock>
                <Price>
                  1 299 ₽<span>2 600 ₽</span>
                </Price>

                <div className="price-info">
                  или 279 ₽/мес. при рассрочке на 24 мес.
                </div>
              </PriceBlock>
              <div className="option-rate">В тариф входят:</div>
              <ul>
                <li>
                  <img src={check_icon} alt="check_icon" />
                  Все пункты тарифа Beginner
                </li>
                <li>
                  <img src={check_icon} alt="check_icon" />
                  Экспорт истории
                </li>
                <li>
                  <img src={check_icon} alt="check_icon" />
                  Поддержка 24/7
                </li>
              </ul>
              <RequestData className="card">Подробнее</RequestData>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="business">
              <div>
                <TitleCard>Business</TitleCard>
                <div className="sub-title">Рекомендации по приоритетам</div>
              </div>
              <img
                className="icon-card"
                src={business_rate_icon}
                alt="pro-business-icon"
              />
            </CardHeader>

            <CardContent>
              <PriceBlock>
                <Price>
                  2 379 ₽<span>3 700 ₽</span>
                </Price>
              </PriceBlock>
              <div className="option-rate">В тариф входят:</div>
              <ul>
                <li>
                  <img src={check_icon} alt="check_icon" />
                  Все пункты тарифа Pro
                </li>
                <li>
                  <img src={check_icon} alt="check_icon" />
                  Безлимитное количество запросов
                </li>
                <li>
                  <img src={check_icon} alt="check_icon" />
                  Приоритетная поддержка
                </li>
              </ul>
              <RequestData className="card">Подробнее</RequestData>
            </CardContent>
          </Card>
        </BlockCardRate>
      </BlockRate>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 60px;
  padding-right: 60px;
  max-width: 1320px;
  margin: 0 auto;
  align-items: center;

  .resize-image {
    width: 1307px;
    height: 576px;
  }

  @media screen and (max-width: 600px) {
    padding-left: 0px;
    padding-right: 0px;

    .resize-image {
      height: 392px;
      width: 350px;

      img {
        object-fit: cover;
        object-position: 0 0;
        height: 100%;
        width: 100%;
      }
    }
  }
`;

const TopBlock = styled.div`
  display: flex;
  padding-top: 69px;
  padding-bottom: 118px;

  .image-top-block {
    width: 629px;
    height: 620px;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    width: 100%;
    min-width: 335px;
    padding-bottom: 55px;

    .image-top-block {
      width: 347px;
      height: 342px;

      img {
        object-fit: cover;
        object-position: 0 0;
        width: 100%;
        height: 100%;
      }
    }
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  width: 743px;
  font-family: "Roboto";
  font-size: 60px;
  line-height: 72px;
  text-align: left;
  z-index: 2;
  text-transform: uppercase;
  margin-right: -52px;
  margin-bottom: 20px;

  @media screen and (max-width: 600px) {
    width: 361px;
    font-size: 28px;
    line-height: 34px;
  }
`;

const TitleInfo = styled.div`
  margin-bottom: 70px;
  width: 534px;

  @media screen and (max-width: 600px) {
    width: 327px;
    margin-bottom: 32px;
  }
`;

const RequestData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 335px;
  height: 59px;
  border-radius: 5px;
  background-color: var(--bg-color1);
  color: var(--text-color1);
  font-family: "InterMedium";
  font-size: 22px;
  line-height: 27px;
  cursor: pointer;

  &.card {
    max-width: 100%;
    margin-right: 30px;

    @media screen and (max-width: 600px) {
      margin-right: 24px;
    }
  }
`;

const BlockRate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 70px;
  margin-bottom: 118px;
  margin-top: 107px;

  .header-block-rate {
    font-family: "Roboto";
    font-size: 45px;
    line-height: 54px;
  }

  @media screen and (max-width: 600px) {
    margin-bottom: 43px;
    margin-top: 80px;
    gap: 37px;

    .header-block-rate {
      font-size: 28px;
      line-height: 34px;
    }
  }
`;

const BlockCardRate = styled.div`
  display: flex;
  justify-content: center;
  gap: 37px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Card = styled.div`
  height: 540px;
  box-shadow: 0px 0px 20px 0px #00000033;
  border-radius: 10px;
  width: 415px;
  box-sizing: border-box;

  &.current_rate {
    border: 2px solid #ffb64f;
  }

  .option-rate {
    font-family: "InterMedium";
    line-height: 24px;
    font-size: 20px;
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding-left: 0px;
    margin-bottom: 55px;

    font-family: "InterRegular";

    li {
      display: flex;
      align-items: center;
      font-size: 18px;
      line-height: 22px;

      img {
        margin-right: 8px;
      }

      @media screen and (max-width: 600px) {
        font-size: 16px;
        line-height: 19px;
      }
    }
  }

  @media screen and (max-width: 600px) {
    width: 335px;
    height: max-content;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 132px;
  border-radius: 10px 10px 0 0;
  color: var(--primary-color2);
  padding-left: 30px;
  padding-right: 15px;
  white-space: nowrap;
  position: relative;

  .icon-card {
    position: absolute;
    top: 15px;
    right: 5px;
  }

  @media screen and (max-width: 600px) {
    .icon-card {
      object-fit: cover;
      object-position: 0 0;
      width: 70px;
    }
  }

  &.begginer {
    background-color: var(--bg-color2);
  }

  &.pro {
    background-color: var(--bg-color3);
  }

  &.business {
    background-color: var(--primary-color2);
    color: var(--primary-color3);
  }

  .sub-title {
    font-size: 18px;
  }
`;

const TitleCard = styled.div`
  font-family: "InterMedium";
  font-size: 30px;
  line-height: 36px;
  margin-bottom: 10px;

  @media screen and (max-width: 600px) {
    text-align: left;
  }
`;

const CardContent = styled.div`
  margin-left: 30px;
  margin-bottom: 24px;
  margin-top: 33px;
  position: relative;

  .current-rate {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -21px;
    right: 10px;
    background-color: #3ba5e0;
    color: var(--primary-color3);

    width: 134px;
    height: 24px;

    border-radius: 10px;
    font-size: 14px;
    line-height: 17px;
  }

  @media screen and (max-width: 600px) {
    margin-left: 24px;
    margin-bottom: 33px;

    .current-rate {
      display: none;
    }
  }
`;

const PriceBlock = styled.div`
  display: flex;
  flex-direction: column;
  height: 68px;
  margin-bottom: 59px;

  .price-info {
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
  }

  @media screen and (max-width: 600px) {
    margin-bottom: 37px;
    height: max-content;
  }
`;

const Price = styled.div`
  font-family: "InterMedium";
  font-size: 30px;
  line-height: 36px;
  margin-bottom: 10px;

  span {
    font-size: 25px;
    line-height: 30px;
    color: rgba(0, 0, 0, 0.5);
    text-decoration: line-through;
    margin-left: 19px;
  }
`;

const WrapperSlider = styled.div`
  display: flex;
  flex-direction: column;
  gap: 70px;
  margin-bottom: 70px;

  .title-slider {
    font-family: "Roboto";
    font-size: 45px;
    line-height: 54px;
    margin-left: 60px;
    text-transform: uppercase;

    @media screen and (max-width: 600px) {
      font-size: 28px;
      line-height: 34px;
      margin-left: 14px;
      width: 240px;
    }
  }

  @media screen and (max-width: 600px) {
    align-items: flex-start;
    gap: 32px;
  }
`;

const ContainerSlider = styled.div`
  padding-left: 60px;
  padding-right: 60px;
  max-width: 1440px;
  box-sizing: border-box;

  @media screen and (max-width: 600px) {
    max-width: 375px;
    padding-left: 17px;
    padding-right: 17px;
  }
`;

const OptionItem = styled.div`
  box-shadow: 0px 0px 20px 0px #00000033;
  max-width: 400px;
  height: 225px;
  border-radius: 10px;
  box-sizing: border-box;
  margin: 20px;
  padding-top: 30px;
  padding-left: 20px;

  .icon-slider {
    margin-bottom: 19px;
  }

  @media screen and (max-width: 600px) {
    max-width: 298px;
    height: 188px;
    padding-top: 10px;
  }
`;

export default MainLayout;
