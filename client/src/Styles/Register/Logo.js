import styled from "styled-components";

export const LogoWrapper = styled.div`
  position: relative;
  span {
    font-size: 128px;
    font-family: "Merienda One", cursive;
  }

  .Q {
    color: ${props => props.theme.pink};
  }

  .B {
    color: ${props => props.theme.aqua};
  }

  .dot {
    font-size: 128px;
    font-family: "Merienda One", cursive;
    color: ${props => props.theme.pink};
    position: absolute;
    bottom: -66px;
    left: 34px;
  }

  img {
    height: 100px;
    position: absolute;
    top: -30px;
    left: -47px;
    transform: rotate(-40deg);
    z-index: 1;
    background-color: white;
  }
`;
