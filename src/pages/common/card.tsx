import styled from "styled-components";
import { useRef, useEffect } from "react";
import { IAttributes } from "../../types/response_types";

interface IProps {
  title: string;
  date: string;
  source: string;
  linkSource: string;
  content: string;
  attributes: IAttributes;
}

const Card = ({
  title,
  date,
  source,
  linkSource,
  content,
  attributes,
}: IProps) => {
  const ref: any = useRef(null);

  const options = {
    threshold: 0.1,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry!.isIntersecting) {
        // Логика обработки видимости компонента

        if (entry!.target.children[4]?.tagName === "IMG") {
          ref.current.querySelector("img").src = urlImage;
        }

        observer.unobserve(ref.current);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/xml");

  let urlImage: any | undefined = "";
  if (content.includes("src=")) {
    let splitStr = content!.split(`src="`)[1];
    urlImage = splitStr!.split(`"`)[0];
  }

  let paragraph = "";
  const paragraphTags = doc!.documentElement!.textContent!;

  for (let i = 0; i < paragraphTags.length; i++) {
    const newText = paragraphTags[i];
    paragraph += newText;
  }

  const clearText = paragraph.replace(/<\/?[^>]+(>|$)/g, "");

  const dateFormat = new Date(date).toLocaleDateString();

  return (
    <Wrapper ref={ref} className="lazyLoad">
      <div className="header">{dateFormat}</div>
      <div className="header source">{source}</div>

      <Title>{title}</Title>

      <BlockType>
        {attributes.isTechNews && (
          <div className="type-public">технические новости</div>
        )}
        {attributes.isAnnouncement && (
          <div className="type-public">анонсы и события</div>
        )}
        {attributes.isDigest && (
          <div className="type-public">сводки новостей</div>
        )}
      </BlockType>

      {!!urlImage.length && <ImageCard />}

      <Content>{clearText}</Content>

      <FooterCard>
        <a href={linkSource} className="link-source" target="_blank">
          Читать в источнике
        </a>
        <div className="word-count">{attributes?.wordCount} слова</div>
      </FooterCard>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 641px;
  height: 694px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 19px 30px 35px 30px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .type-public {
    background-color: var(--bg-color2);
    border-radius: 5px;
    width: max-content;
    white-space: nowrap;

    font-family: "InterRegular";

    font-size: 12px;
    line-height: 15px;
    padding: 4px 11px 3px 14px;
  }

  span {
    width: max-content;
  }

  .header {
    font-family: "InterRegular";
    font-size: 16px;
    line-height: 19px;
    color: #949494;
  }

  .source {
    margin-bottom: 24px;
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  @media screen and (max-width: 600px) {
    width: 335px;
    height: max-content;

    padding: 19px 14px 18px 24px;

    .source {
      margin-bottom: 21px;
    }
  }
`;

const Title = styled.div`
  font-family: "InterMedium";
  font-size: 26px;
  line-height: 31px;

  @media screen and (max-width: 600px) {
    font-size: 19px;
    line-height: 23px;
    margin-bottom: 6px;
  }
`;

const Content = styled.div`
  width: 581px;
  min-height: max-content;
  overflow: hidden;
  max-height: 228px;
  margin-bottom: 32px;
  font-family: "InterRegular";
  font-size: 16px;
  line-height: 19px;
  color: rgba(0, 0, 0, 0.5);
  text-overflow: ellipsis;

  @media screen and (max-width: 600px) {
    font-size: 12px;
    line-height: 15px;

    margin-bottom: 25px;

    width: 290px;
    max-height: 270px;
  }
`;

const BlockType = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 14px;

  @media screen and (max-width: 600px) {
    flex-wrap: wrap;
    gap: 10px;
  }
`;

const ImageCard = styled.img`
  height: 158px;
  width: 581px;
  object-position: center;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;

  @media screen and (max-width: 600px) {
    width: 297px;
    height: 158px;
  }
`;

const FooterCard = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  align-items: flex-end;

  .link-source {
    width: 223px;
    height: 47px;
    border-radius: 5px;
    background-color: var(--bg-color3);
    font-family: "InterRegular";
    font-size: 16px;
    line-height: 19px;

    text-decoration: none;
    color: var(--primary-color2);
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 600px) {
      width: 195px;
      height: 41px;
      font-size: 14px;
      line-height: 17px;
    }
  }

  .word-count {
    color: #949494;

    @media screen and (max-width: 600px) {
      font-size: 14px;
      line-height: 17px;
    }
  }
`;

export default Card;
