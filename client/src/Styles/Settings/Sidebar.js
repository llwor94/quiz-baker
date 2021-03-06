import styled from 'styled-components'

export const ProfileWrapper = styled.div`
  ${props => props.theme.flex('column', undefined, 'center')} h4 {
    font-size: 18px;
    line-height: 25px;
    color: ${props => props.theme.text};
  }

  .tab {
    font-size: 26px;
    cursor: pointer;
    span {
      text-align: right;
      font-family: 'Merienda One', cursive;
      color: ${props => props.theme.accentText};
      &:hover {
        color: ${props => props.theme.text};
      }
    }
  }
`

export const ProfileButtonWrapper = styled.div`
  ${props => props.theme.flex('column', 'flex-start', 'flex-start')};
  width: 200px;
  .update-user {
    ${props => props.theme.flex(undefined, 'space-between')};
    width: 100%;
    margin-top: 10px;
  }
  .p-float-label {
    width: 100%;
    input {
      width: 100%;
    }
  }
`

export const ButtonCollapse = styled.div`
  height: 90px;
  width: 100px;
  background-color: ${props => props.theme.aqua};
  cursor: pointer;
  position: absolute;
  left: -16px;
  border-radius: 7px;
  writing-mode: vertical-lr;
  text-orientation: upright;
  color: white;
  font-weight: 700;
  div {
    font-size: 6px;
  }
`
