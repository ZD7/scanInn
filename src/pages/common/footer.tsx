import styled from "styled-components";
import { FC } from "react";
import logo_footer from "../../images/logo-footer.svg";

interface IProps {}

const Footer: FC<IProps> = () => {
  return (
    <Wrapper>
      <img src={logo_footer} alt="icon-logo" />
      <RightBlock>
          <div>г. Москва, Цветной б-р, 40</div>
          <div>+7 495 771 21 11</div>
          <div>info@skan.ru</div>
          <div>Copyright. 2022</div>
      </RightBlock>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  height: 137px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 60px;
  padding-right: 60px;
  background-color: var(--primary-color);
  color: #FFFFFF;
  white-space: nowrap;

  @media screen and (max-width: 400px) {
    padding-left: 14px;
    padding-right: 14px;

    img {
      width: 111px;
      height: 111px;
    }
  }
`;

const RightBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;

  div:nth-last-child(1) {
    margin-top: 21px;
  }
`;

export default Footer;
