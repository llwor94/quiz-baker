import styled from 'styled-components'

export const SplashWrapper = styled.div`
  position: relative;
  width: 505px;
  padding: 10px;
  ${props => props.theme.fancyBorder};
  background-color: ${props => props.theme.secondary};
  strong {
    margin-bottom: 5px;
  }
  span {
    font-size: 14px;
  }

  .inner {
    ${props => props.theme.flex(undefined, 'space-between')};
    svg {
      height: 295px;
      width: 177px;
      fill: ${props => props.theme.text};
    }
    .body {
      max-width: 320px;
    }
  }
  .back-btn {
    position: absolute;
    top: 2px;
    right: 527px;
    width: 35px;
  }
  .timed {
    font-size: 14px;
    i {
      color: ${props => props.theme.darkPink};
    }
  }
  .notTimed {
    height: 23px;
  }
  @media (max-width: 505px) {
    width: 90%;
    margin: 0 5px;
  }
`

export const SplashTitle = styled.div`
  font-size: 36px;
  font-family: 'Merienda One', cursive;
  margin-bottom: 15px;
  color: ${props => props.theme.header};
`

export const SplashHeader = styled.div`
  font-size: 18px;
  font-family: 'Merienda One', cursive;
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
    color: ${props => props.theme.darkPink};
  }
`

export const SplashDescription = styled.div`
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 8px;
  padding-right: 2px;
`

export const Fork = styled.img`
  max-height: 320px;
`

export const SplashFooter = styled.div`
  color: gray;
  margin-bottom: 15px;
  .questionCount {
    color: ${props => props.theme.aqua};
  }
  .score {
    color: ${props => props.theme.aqua};
  }
`
