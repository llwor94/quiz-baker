import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 500px;
  .inner {
    position: relative;
    padding: 12px;
    background-color: ${props => props.theme.secondary};
    margin-bottom: 10px;
    ${props => props.theme.fancyBorder};

    .wrapper {
      opacity: 0;
    }
  }
  @media (max-width: 505px) {
    width: 90%;
    margin: 0 5px;
  }
`

export const QuestionWrapper = styled.div`
  color: ${props => props.theme.aqua};
  font-size: 24px;
  font-weight: 700;
  padding: 0 5px 0 0;
`

export const AnswerWrapper = styled.div`
  margin-top: 15px;
  height: 80%;
  ${props => props.theme.flex('column', 'center')};
`

export const Answer = styled.div`
  padding-top: 4px;
  margin-left: 70px;
  &:not(:last-child) {
    padding-bottom: 10px;
  }
  .p-radiobutton .p-radiobutton-box {
    background-color: ${props => props.theme.secondary};
    border-color: ${props => props.theme.accent};
  }
  .p-radiobutton .p-radiobutton-box.p-highlight .p-radiobutton-icon {
    background-color: ${props => props.theme.secondary};
  }

  .p-radiobutton .p-radiobutton-box.p-highlight {
    ${props => props.theme.backgroundBorder(props.theme.pink)} &:not(.p-disabled) :hover {
      ${props => props.theme.backgroundBorder(props.theme.darkPink)};
    }
  }
`

export const Label = styled.label`
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  padding-left: 4px;
  color: ${props => props.theme.text};
`

export const Logo = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0 5px 5px 0;
  span {
    font-size: 36px;
    font-family: 'Merienda One', cursive;
  }
  .Q {
    color: ${props => props.theme.accentRed};
  }

  .B {
    color: ${props => props.theme.aqua};
  }
`
