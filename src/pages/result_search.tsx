import styled from "styled-components";
import { useEffect } from "react";
import Preloader from "./common/preloader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AppRootStoreType } from "../store/store";
import { dataAPI } from "../server_api/data_api";
import { useDispatch, useSelector } from "react-redux";
import { getDocument, getDocumentChunk } from "../store/reducers/data_reducer";
import LazyLoadCard from "./common/lazy_load";
import image_wait_result from "../images/result-search.svg";
import { PrevArrow, NextArrow } from "../helpers/custom_arrows_slider";
import { splitArrayIntoChunks } from "../helpers/split_count_into_chunks";

const ResultSearch = ({ data }) => {
  const dispatch = useDispatch();

  const idDocuments = useSelector<AppRootStoreType, string[]>(
    (state) => state.data.idDocuments
  );

  useEffect(() => {
    if (!!idDocuments.length) {
      const chunks = splitArrayIntoChunks(idDocuments, 100);

      const processRequestChunk = async (item) => {
        await dataAPI.getDocument({ ids: item }).then((res) => {
          dispatch(getDocumentChunk({ documentsChunk: res.data }));
        });

        dispatch(getDocument());
      };

      // Проходим по массиву и для каждого элемента вызываем makeApiRequest
      chunks.map((item) => processRequestChunk(item));
    }
  }, [idDocuments]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1290,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7,
        },
      },
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 1030,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 510,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Page>
      <TopBlock>
        <Left>
          <div>
            <div className="title">Ищем. Скоро будут результаты</div>
            <div>
              Поиск может занять некоторое время, просим сохранять терпение.
            </div>
          </div>
          <div className="group">
            <div className="sub-title">Общая сводка</div>
            {data.data !== null && !data.data[0] && (
              <div className="all-find">
                Найдено {!data.data[0] ? 0 : data.data[0].data.length}
              </div>
            )}
          </div>
          <img
            src={image_wait_result}
            alt="wait-result"
            className={"top-block-image"}
          />
        </Left>
      </TopBlock>

      {data.data === null || data.data[0] ? (
        <>
          <Wrapper>
            <DataItem className="name-rows">
              <div className="date">Период</div>
              <div className="total">Всего</div>
              <div>Риски</div>
            </DataItem>
            <Container>
              {data.data === null ? (
                <Block>
                  <Preloader />
                </Block>
              ) : data.data[0] ? (
                <Slider {...settings}>
                  {data.data[0].data?.map((option, index) => (
                    <DataItem key={index}>
                      <div className="date">
                        {new Date(option.date).toLocaleDateString()}
                      </div>
                      <div className="total">{option.value}</div>
                      <div>{data.data[1].data[index].value}</div>
                    </DataItem>
                  ))}
                </Slider>
              ) : (
                ""
              )}
            </Container>
          </Wrapper>
          <LazyLoadCard />
        </>
      ) : (
        <div className="is-find-document">
          Докуметов с выбранными параметрами не найдены
        </div>
      )}
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .is-find-document {
    font-family: "InterRegular";
    line-height: 24px;
    font-size: 20px;
    color: var(--bg-color2);

    height: 156px;
    margin-left: 60px;
    margin-bottom: 107px;

    @media screen and (max-width: 600px) {
      width: 350px;
      margin-left: 14px;
      margin-bottom: 0;
    }
  }
`;

const TopBlock = styled.div`
  display: flex;
  gap: 215px;
  margin-left: 60px;
  margin-bottom: 27px;
  margin-top: 25px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    margin-left: 14px;
    margin-bottom: 34px;
    margin-top: 0px;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 416px;
  font-family: "InterRegular";
  line-height: 24px;
  font-size: 20px;

  .title {
    font-family: "Roboto";
    font-size: 40px;
    line-height: 48px;
    text-transform: uppercase;
    padding-top: 44px;
    margin-bottom: 36px;

    @media screen and (max-width: 600px) {
      font-size: 28px;
      line-height: 34px;
      padding-top: 20px;
      margin-bottom: 21px;
    }
  }

  .sub-title {
    font-family: "Roboto";
    font-size: 30px;
    line-height: 36px;
    text-transform: uppercase;
    padding-top: 127px;
    margin-bottom: 17px;
  }

  .all-find {
    color: #949494;
    font-size: 18px;
    line-height: 22px;
  }

  @media screen and (max-width: 600px) {
    font-size: 18px;
    line-height: 22px;
    flex-wrap: nowrap;
    height: max-content;
    width: 344px;
    height: 543px;

    .top-block-image {
      order: 1;
      width: 350px;
      height: 234px;
      margin-top: 21px;
    }

    .group {
      order: 2;
    }

    .sub-title {
      padding-top: 59px;
      margin-bottom: 10px;
      font-size: 28px;
      line-height: 34px;
    }
  }
`;

const Wrapper = styled.div`
  position: relative;
  min-height: 156px;
  margin-bottom: 107px;
  width: 100%;

  .name-rows {
    position: absolute;
    top: 0px;
    left: 60px;
    background-color: var(--primary-color);
    color: var(--primary-color3);
    border-radius: 10px 0px 0px 10px;

    margin-top: 0px;
    margin-bottom: 0px;
    padding-top: 17px;
    padding-bottom: 17px;
    padding-left: 28px;

    border: none;
    height: 156px;
    text-align: left;
  }

  .show-button {
    width: 176px;
    height: 45px;
    border: 1px solid #4c3db2;
    color: #4c3db2;
    background-color: #ffffff;
  }

  @media screen and (max-width: 600px) {
    margin-bottom: 57px;
  }
`;

const Container = styled.div`
  padding-left: 60px;
  padding-right: 60px;
  max-width: 1346px;
  max-height: 158px;

  .slick-slider.slick-initialized {
    padding-left: 150px;
    border: 2px solid var(--primary-color);
    border-radius: 10px;
    padding-right: 21px;
  }
`;

const DataItem = styled.div`
  text-align: center;
  width: 131px;
  border-right: 2px solid rgba(148, 148, 148, 0.4);
  box-sizing: border-box;
  margin-top: 17px;
  margin-bottom: 17px;

  font-family: "InterRegular";
  font-size: 18px;
  line-height: 22px;

  .date {
    margin-bottom: 29px;
  }

  .total {
    margin-bottom: 23px;
  }
`;

const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  border: 2px solid var(--primary-color);
  border-radius: 10px;
  height: 156px;
  box-sizing: border-box;
`;

export default ResultSearch;
