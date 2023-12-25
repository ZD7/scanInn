import styled from "styled-components";
import { validateInn } from "../helpers/validate_inn";
import { useState, useEffect } from "react";
import main_image_search_params from "../images/main-search-params.svg";
import icon_document from "../images/icon-document.svg";
import icon_folders from "../images/icons-folders.svg";
import Checkbox from "./common/checkbox";
import { dataAPI } from "../server_api/data_api";
import { IHistogram } from "../types/types";
import { AppRootStoreType } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
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
} from "../store/reducers/settings_reducer";

import { getIdDocument } from "../store/reducers/data_reducer";

import { TypeTonality, ItemsDocument } from "../types/types";

const SearchParams = ({ setIsResult, setData }) => {
  const dispatch = useDispatch();

  const settings = useSelector<AppRootStoreType, IHistogram>(
    (state) => state.settings
  );

  const currentTonality = useSelector<AppRootStoreType, string>(
    (state) => state.settings.searchContext.targetSearchEntitiesContext.tonality
  );

  const maxFullness = useSelector<AppRootStoreType, boolean>(
    (state) =>
      state.settings.searchContext.targetSearchEntitiesContext
        .targetSearchEntities[0]!.maxFullness
  );

  const inBusinessNews = useSelector<AppRootStoreType, boolean>(
    (state) =>
      state.settings.searchContext.targetSearchEntitiesContext
        .targetSearchEntities[0]!.inBusinessNews
  );

  const onlyMainRole = useSelector<AppRootStoreType, boolean>(
    (state) =>
      state.settings.searchContext.targetSearchEntitiesContext.onlyMainRole
  );

  const onlyWithRiskFactors = useSelector<AppRootStoreType, boolean>(
    (state) =>
      state.settings.searchContext.targetSearchEntitiesContext
        .onlyWithRiskFactors
  );

  const excludeTechNews = useSelector<AppRootStoreType, boolean>(
    (state) => state.settings.attributeFilters.excludeTechNews
  );

  const excludeAnnouncements = useSelector<AppRootStoreType, boolean>(
    (state) => state.settings.attributeFilters.excludeAnnouncements
  );

  const excludeDigests = useSelector<AppRootStoreType, boolean>(
    (state) => state.settings.attributeFilters.excludeDigests
  );

  console.log("settings", settings);

  const [innCompany, setInnCompany] = useState("");
  const [isValidInn, setIsValidInn] = useState(true);
  const [warningValueInn, setWarningValueInn] = useState("");

  console.log("isValidInn", isValidInn);

  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [isValidDateStart, setIsValidDateStart] = useState(true);
  const [isValidDateEnd, setIsValidDateEnd] = useState(true);
  const [isValidDate, setIsValidDate] = useState(false);
  const [warningDate, setWarningDate] = useState("");

  const [isShowListTonality, setIsShowListTonality] = useState(false);

  let error = {
    code: null,
    message: null,
  };

  const onChangeValueInn = (e) => {
    let resultValidate = validateInn(e.currentTarget.value, error);
    setIsValidInn(resultValidate.result);
    setWarningValueInn(resultValidate.error);
    setInnCompany(e.currentTarget.value);
  };

  const onBlurInn = () => {
    if (!innCompany.length) {
      setWarningValueInn("Введите ИНН");
    } else {
      dispatch(setInn({ inn: innCompany }));
    }
  };

  const [limit, setLimit] = useState<number | null>(null);
  const [isValidLimit, setIsValidLimit] = useState(false);
  const [warningLimit, setWarningLimit] = useState("");

  const isValidLimitPublic = (value) => {
    if (value >= 1 && value <= 1000) {
      setWarningLimit("");
      setIsValidLimit(true);
    } else {
      setWarningLimit("число не соответсвует условию");
      setIsValidLimit(false);
    }
  };

  const onChangeValueLimit = (e) => {
    setLimit(e.currentTarget.value);
    isValidLimitPublic(e.currentTarget.value);
  };

  const onBlurLimit = () => {
    if (limit && isValidLimit) {
      dispatch(setLimitPublic({ limit }));
    } else {
      setWarningLimit("Введите число");
      setIsValidLimit(false);
    }
  };

  const ChangetypeTonality = (e) => {
    setIsShowListTonality(false);
    const tonality = Object.keys(TypeTonality).find(
      (key) => TypeTonality[key] === e.target.innerText
    )!;
    dispatch(setTonality({ tonality }));
  };

  const getData = (e) => {
    e.preventDefault();
    setIsResult(true);

    dataAPI
      .getData(settings)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });

    dataAPI
      .getIdDocument(settings)
      .then((res) => res.data)
      .then((id) => dispatch(getIdDocument({ id: id.items })))
      .catch((err) => {});
  };

  useEffect(() => {
    if (
      (!isValidDateStart && !dateStart.length) ||
      (!isValidDateEnd && !dateEnd.length)
    ) {
      setWarningDate("Введите дату");
      setIsValidDate(false);
    } else if (dateEnd.length && dateStart.length) {
      const diffDate =
        new Date(dateEnd).getTime() - new Date(dateStart).getTime();

      if (diffDate < 0) {
        setIsValidDate(false);
        setWarningDate("Введите корректные данные");
      } else {
        setIsValidDate(true);
        dispatch(
          setStartDate({ startDate: new Date(dateStart).toISOString() })
        );
        dispatch(setEndDate({ endDate: new Date(dateEnd).toISOString() }));
      }
    } else if (
      (!isValidDateStart && dateStart.length) ||
      (!isValidDateEnd && dateEnd.length)
    ) {
      setIsValidDate(false);
    }
  }, [dateStart, dateEnd, isValidDateStart, isValidDateEnd]);

  const [isValidForm, setIsValidDateForm] = useState(false);

  useEffect(() => {
    if (isValidLimit && isValidInn && isValidDate) {
      setIsValidDateForm(true);
    } else {
      setIsValidDateForm(false);
    }
  }, [isValidLimit, isValidInn, isValidDate]);

  return (
    <Container>
      <HeaderBlock>
        <TitleBlock>
          <div className="title">Найдите необходимые данные в пару кликов.</div>
          <div>Задайте параметры поиска.</div>
          <div>Чем больше заполните, тем точнее поиск</div>
        </TitleBlock>

        <img
          src={icon_document}
          alt="icon_document"
          className="icon_document"
        />
        <img src={icon_folders} alt="icon_folders" className="icon_folders" />
      </HeaderBlock>

      <BlockParams>
        <Form className="request">
          <LeftBlock>
            <label>
              ИНН компании *
              <input
                type="number"
                id="name"
                placeholder="10 цифр"
                onChange={onChangeValueInn}
                value={innCompany}
                onBlur={onBlurInn}
              />
              {warningValueInn && (
                <div className="warning">{warningValueInn}</div>
              )}
            </label>
            <label>
              Тональность
              <BlockTonality>
                <CurrentTonality
                  onClick={() => setIsShowListTonality(!isShowListTonality)}
                  isShow={isShowListTonality}
                >
                  {TypeTonality[currentTonality]}
                </CurrentTonality>
                {isShowListTonality && (
                  <ListTonality>
                    <div onClick={ChangetypeTonality} className="item-tonality">
                      {TypeTonality.any}
                    </div>
                    <div onClick={ChangetypeTonality} className="item-tonality">
                      {TypeTonality.positive}
                    </div>
                    <div onClick={ChangetypeTonality} className="item-tonality">
                      {TypeTonality.negative}
                    </div>
                  </ListTonality>
                )}
              </BlockTonality>
            </label>
            <label>
              Количество документов в выдаче *
              <input
                type="number"
                placeholder="От 1 до 1000"
                onChange={onChangeValueLimit}
                value={limit ? limit : ""}
                onBlur={onBlurLimit}
              />
              {warningLimit && <div className="warning">{warningLimit}</div>}
            </label>
            <label>
              Диапазон поиска *
              <BlockDate>
                <input
                  className="date"
                  type="date"
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                  onBlur={() => setIsValidDateStart(false)}
                  required
                />
                <input
                  className="date"
                  type="date"
                  value={dateEnd}
                  onChange={(e) => setDateEnd(e.target.value)}
                  onBlur={() => setIsValidDateEnd(false)}
                />
              </BlockDate>
              {!isValidDate && <div className="warning">{warningDate}</div>}
            </label>
          </LeftBlock>

          <RightBlock>
            <ContainerCheck>
              <Checkbox
                text="Признак максимальной полноты"
                isChecked={maxFullness}
                onChange={() => dispatch(setMaxFullness())}
              />
              <Checkbox
                text="Упоминания в бизнес-контексте"
                isChecked={inBusinessNews}
                onChange={() => dispatch(setInBusinessNews())}
              />
              <Checkbox
                text="Главная роль в публикации"
                isChecked={onlyMainRole}
                onChange={() => dispatch(setOnlyMainRole())}
              />
              <Checkbox
                text="Публикации только с риск-факторами"
                isChecked={onlyWithRiskFactors}
                onChange={() => dispatch(setOnlyWithRiskFactors())}
              />
              <Checkbox
                text="Включать технические новости рынков"
                isChecked={excludeTechNews}
                onChange={() => dispatch(setExcludeTechNews())}
              />
              <Checkbox
                text="Включать анонсы и календари"
                isChecked={excludeAnnouncements}
                onChange={() => dispatch(setExcludeAnnouncements())}
              />
              <Checkbox
                text="Включать сводки новостей"
                isChecked={excludeDigests}
                onChange={() => dispatch(setExcludeDigests())}
              />
            </ContainerCheck>

            <div>
              <ButtonSearch
                className="button form-request"
                onClick={getData}
                disabled={!isValidForm}
              >
                Поиск
              </ButtonSearch>
              <div className="notice">* Обязательные к заполнению поля</div>
            </div>
          </RightBlock>
        </Form>

        <div className="image_search_params">
          <img src={main_image_search_params} alt="main_image_search_params" />
        </div>
      </BlockParams>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  padding-bottom: 64px;
  padding-left: 60px;

  @media screen and (max-width: 600px) {
    padding-left: 14px;
    padding-right: 14px;
    padding-bottom: 24px;

    .resize-image {
      height: 392px;
      width: 350px;
      object-fit: cover;
      object-position: 0 0;
    }
  }
`;

const HeaderBlock = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 47px;
  align-items: flex-end;
  position: relative;

  .icon_document {
    margin-bottom: -5px;
    margin-right: 166px;
  }

  .icon_folders {
    margin-bottom: 20px;
  }

  @media screen and (max-width: 600px) {
    width: 375px;
    margin-bottom: 21px;
    padding-left: 14px;
    .icon_document {
      position: absolute;
      right: 26px;
      bottom: 74px;

      margin-right: 0;
      width: 58px;
    }

    .icon_folders {
      display: none;
    }
  }
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;

  font-family: "InterRegular";
  font-weight: 400;
  line-height: 24px;
  padding-top: 69px;
  padding-right: 205px;

  .title {
    font-family: "Roboto";
    font-size: 40px;
    font-weight: 900;
    line-height: 48px;
    margin-bottom: 25px;
    width: 680px;
    text-transform: uppercase;
  }

  @media screen and (max-width: 600px) {
    padding-right: 0px;
    padding-top: 20px;
    font-size: 18px;
    line-height: 22px;
    width: 260px;

    .title {
      width: 335px;
      font-size: 28px;
      line-height: 34px;
      margin-bottom: 19px;
    }
  }
`;

const Form = styled.form`
  box-sizing: border-box;
  width: 872px;
  height: 543px;
  display: flex;
  gap: 11px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0px #00000033;
  padding-left: 44px;
  padding-right: 39px;

  @media screen and (max-width: 600px) {
    height: 688px;
    width: 375px;
    box-sizing: border-box;
    flex-direction: column;
    padding-left: 14px;
    padding-right: 14px;
  }
`;

const LeftBlock = styled.div`
  margin-top: 21px;
  width: 372px;
  gap: 30px;
  display: flex;
  flex-direction: column;
  height: max-content;

  label {
    display: flex;
    flex-direction: column;
    gap: 20px;

    font-family: "InterRegular";
    font-size: 18px;
    line-height: 22px;
    position: relative;
    width: max-content;

    .warning {
      color: #ff5959;
      font-family: "InterRegular";
      font-size: 14px;
      line-height: 17px;
      text-align: center;
      position: absolute;
      top: 85px;
      width: 100%;
    }
  }

  input {
    width: 242px;
    height: 43px;
    border-radius: 5px;
    border: 1px solid #c7c7c7;
    box-shadow: 0px 0px 20px 0px #0000000d;
    text-align: center;

    &.date {
      width: 176px;
    }

    @media screen and (max-width: 600px) {
      width: 335px;

      &.date {
        width: 335px;
      }
    }
  }
`;

const BlockTonality = styled.div`
  position: relative;
`;

const CurrentTonality = styled.div<{ isShow: boolean }>`
  display: flex;
  align-items: center;
  width: 242px;
  height: 43px;
  padding-left: 22px;
  box-sizing: border-box;

  font-family: "InterRegular";
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;

  border: 1px solid #c7c7c7;
  box-shadow: 0px 0px 20px 0px #0000000d;
  border-radius: ${(props) => (props.isShow ? "5px 5px 0 0" : "5px")};

  @media screen and (max-width: 600px) {
    width: 335px;
  }
`;

const ListTonality = styled.div`
  display: flex;
  flex-direction: column;

  height: 129px;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-around;

  border-radius: 0 0 5px 5px;
  z-index: 2;
  background-color: var(--primary-color3);
  border: 1px solid #c7c7c7;
  position: absolute;
  top: 43px;
  left: 0;

  font-family: "InterRegular";
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;

  padding-left: 22px;

  .item-tonality {
    padding-top: 13px;
    padding-bottom: 13px;
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
      color: var(--primary-color);
    }
  }
`;

const RightBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 145px;
  margin-top: 36px;
  align-items: flex-end;

  .notice {
    font-family: "InterRegular";
    font-size: 14px;
    line-height: 17px;
    color: #949494;
  }
`;

const ContainerCheck = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  font-family: "InterRegular";
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.03em;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const ButtonSearch = styled.button`
  width: 305px;
  height: 59px;
  border-radius: 5px;
  background-color: var(--bg-color1);
  color: var(--primary-color3);
  margin-bottom: 10px;
  font-family: "InterMedium";
  font-size: 22px;
  line-height: 27px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @media screen and (max-width: 600px) {
    width: 347px;
  }
`;

const BlockParams = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  width: 100%;

  .image_search_params {
    width: 443px;
    height: 470px;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 24px;

    .image_search_params {
      width: 339px;
      height: 403px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

const BlockDate = styled.div`
  display: flex;
  gap: 20px;

  & input[type="date"] {
    font-family: "InterRegular";
    font-size: 14px;
    line-height: 17px;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export default SearchParams;
