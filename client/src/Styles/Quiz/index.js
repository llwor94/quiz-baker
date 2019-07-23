import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 70%;
  ${props => props.theme.flex('column', undefined, 'center')};
  position: relative;
  margin-top: 85px;

  @media (max-width: 515px) {
    width: 100%;
  }
`
