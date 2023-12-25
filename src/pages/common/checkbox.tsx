import styled from "styled-components";
import notChecked from "../../images/not-checked.svg";
import checked from "../../images/checked.svg";
import { ChangeEvent } from "react";

interface IProps {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  text?: string;
}

const Checkbox = ({ isChecked, onChange, text }: IProps) => {
  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.checked);
  };

  return (
    <Label>
      <InputCheckbox
        type="checkbox"
        checked={isChecked}
        onChange={(event) => onHandleChange(event)}
      />
      <span />
      <p title={text}>{text}</p>
    </Label>
  );
};

export default Checkbox;

const InputCheckbox = styled.input`
  width: 1px;
  height: 1px;
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);

  //Смежные селекторы. A+B выберет элемент B, который идет в коде сразу после A
  & + span {
    position: absolute;
    width: 20px;
    height: 20px;
    background-image: url(${notChecked});
    margin-left: -20px;
  }

  &:checked + span {
    background-image: url(${checked});
  }
`;

const Label = styled.label`
  position: relative;
  padding-left: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;

  p {
    margin-left: 19px;
  }
`;
