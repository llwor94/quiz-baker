import styled from "styled-components";

export const FooterWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 12px;
  font-weight: 700;
`;

export const FooterLink = styled.div`
  padding-right: 4px;
  margin-right: 4px;
  text-transform: capitalize;
  color: ${props => props.theme.accentText};
  cursor: pointer;
`;
