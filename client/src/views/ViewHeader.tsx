import React, {FC} from "react";
import styled from "styled-components";

const StyledViewHeaderDiv = styled.div`
  &.header-text {
    background-image: linear-gradient(to right, blue, aqua);
  }
`;

interface Props {
  text?: string;
}

export const ViewHeader: FC<Props> = (props) => {
  return (
    <StyledViewHeaderDiv className="header-text">
      <h1>{props.text}</h1>
    </StyledViewHeaderDiv>
  );
}