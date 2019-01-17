import styled from "styled-components";

export const SplashWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const SplashTitle = styled.div`
  font-size: 36px;
  font-family: "Merienda One", cursive;
  color: ${props => props.theme.header};
`;

export const SplashHeader = styled.div`
  font-size: 18px;
  font-family: "Merienda One", cursive;
  margin-bottom: 15px;

  .topic {
    font-size: 14px;
    font-weight: 500;
    padding: 5px;
    border-radius: 5px;
    color: white;
    background-color: ${props => props.theme.aqua};
  }

  .author {
      color: ${props => props.theme.header}
  }
`;
