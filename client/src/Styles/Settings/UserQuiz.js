import styled from 'styled-components'

export const InnerWrapper = styled.div`
  flex-grow: 1;
  position: relative;
  margin: 8px;
  ${props => props.theme.flex('column', 'space-between')};
`

export const Header = styled.div`
  font-weight: 400;
  line-height: 16px;
  ${props => props.theme.flex(undefined, undefined, 'center')};
  color: ${props => props.theme.link};
  margin-bottom: 5px;
  a {
    font-weight: 700;
  }
`

export const DescriptionWrapper = styled.div`
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-word;
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    word-wrap: break-word;
    word-break: break-word;
  }
`

export const Wrapper = styled.div`
  width: 400px;
  ${props => props.theme.fancyBorder};
  padding: 12px;
  background-color: ${props => props.theme.secondary};
  margin: 8px;
  display: flex;
  height: 140px;
  margin-bottom: 10px;
  &:hover {
    border-color: ${props => props.theme.pink};
  }

  .p-dialog .p-dialog-titlebar {
    text-align: right;
  }
  .p-dialog .p-dialog-titlebar-icons {
    float: none;
  }
  .p-dialog .p-dialog-content {
    padding: 10px 20px;
    font-size: 15px;
    line-height: 22px;
  }
  .p-dialog .p-dialog-footer {
    padding: 16px;
  }
  .p-dialog .p-dialog-footer button {
    margin-left: 10px;
  }
`

export const FooterWrapper = styled.div`
  ${props => props.theme.flex(undefined, 'space-between', 'flex-end')};
  font-weight: 700;
  a {
    text-transform: capitalize;
    color: ${props => props.theme.accentText};
    &:hover {
      color: ${props => props.theme.accentText};
    }
  }
`

export const Title = styled.a`
  font-size: 24px;
  font-weight: 700;
  margin-right: 10px;
  margin-bottom: 5px;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.darkPink};
  }
`
const FooterAccent = styled.div`
  font-weight: 500;
  padding: 5px;
  border-radius: 5px;
`

export const Topic = styled(FooterAccent)`
  font-size: 14px;
  color: white;
  background-color: ${props => props.theme.aqua};
  margin-right: 10px;
  display: inline-block;
`
