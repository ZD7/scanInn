import { useEffect, useState } from "react";
import { AppRootStoreType } from "../../store/store";
import { IScanDoc } from "../../types/response_types";
import { useSelector } from "react-redux";
import Card from "../common/card";
import styled from "styled-components";

const LazyLoadCard = () => {
  const documents = useSelector<AppRootStoreType, IScanDoc[]>(
    (state) => state.data.documents
  );
  const [visibleCards, setVisibleCards] = useState(0);
  const [loadDocuments, setLoadDocuments] = useState<any>([]);

  useEffect(() => {
    if (!!documents.length) {
      setLoadDocuments(documents.slice(visibleCards, visibleCards + 10));
      setVisibleCards((prev) => prev + 10);
    }
  }, [documents]);

  const addBlocks = () => {
    const newSlice = documents.slice(visibleCards, visibleCards + 10);
    setLoadDocuments([...loadDocuments, ...newSlice]);
    setVisibleCards((prev) => prev + 10);
  };

  return (
    <Container>
      {!!loadDocuments.length && (
        <div className="sub-title">Список документов</div>
      )}
      <ListCard>
        {!!loadDocuments.length &&
          loadDocuments.map((option, index) => (
            <Card
              key={index}
              title={option.title?.text}
              date={option.issueDate}
              source={option.source.name}
              linkSource={option.url}
              content={option.content.markup}
              attributes={option.attributes}
            ></Card>
          ))}
      </ListCard>

      {visibleCards < documents.length && (
        <button className="getMoreCard show-button" onClick={addBlocks}>
          Показать больше
        </button>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 109px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .show-button {
    width: 305px;
    height: 59px;

    border-radius: 5px;
    color: var(--text-color1);

    background-color: var(--bg-color1);
    margin-top: 38px;
    font-family: "InterMedium";
    font-size: 22px;
    line-height: 27px;

    @media screen and (max-width: 600px) {
      width: 335px;
    }
  }

  .sub-title {
    font-family: "Roboto";
    font-size: 30px;
    line-height: 36px;
    text-transform: uppercase;
    margin-bottom: 58px;
    align-self: flex-start;
    margin-left: 60px;
  }

  @media screen and (max-width: 600px) {
    margin-bottom: 57px;
    width: 375px;

    .sub-title {
      font-size: 28px;
      line-height: 34px;
      margin-bottom: 34px;
      margin-left: 14px;
      width: 300px;
    }
  }
`;

const ListCard = styled.div`
  gap: 38px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media screen and (max-width: 600px) {
    gap: 20px;
  }
`;

export default LazyLoadCard;
