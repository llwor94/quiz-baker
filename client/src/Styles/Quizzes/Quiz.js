import styled from "styled-components";

export const Wrapper = styled.div`
  border-radius: 4px;
  /* border: 1px solid; */
  border-color: ${props => props.theme.accent};
  padding: 12px;
  background-color: ${props => props.theme.secondary};
  margin-bottom: 10px;
  color: #333;
  display: flex;
  position: relative;
  justify-content: space-between;
  height: 200px;
  width: 450px;
  margin: 13px;

  border: 1px dashed #ddd;
  box-shadow: 0 0 0 3px ${props => props.theme.secondary}, 0 0 0 5px #ddd,
    0 0 0 10px ${props => props.theme.secondary}, 0 0 2px 10px #eee;

  /* box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
		0 2px 1px -1px rgba(0, 0, 0, 0.12); */
  .p-growl.p-growl-topright {
    opacity: 1 !important;
  }
  .p-growl .p-growl-item-container.p-growl-message-info {
    background-color: ${props => props.theme.pink};
    opacity: 1 !important;
    font-family: "Raleway", sans-serif !important;
    border-radius: 4px;
    color: white;
  }
  .p-growl .p-growl-item-container.p-growl-message-info .p-growl-image {
    display: none;
  }
  .p-growl .p-growl-item-container.p-growl-message-info .p-growl-icon-close {
    color: white;
  }

  &:hover {
    border-color: ${props => props.theme.pink};
  }

  @media (max-width: 450px) {
    width: 100%;
  }
`;

export const HatWrapper = styled.img`
  position: absolute;
  top: -20px;
  left: -20px;
  height: 40px;
  width: 40px;
  transform: rotate(-45deg);
  background-color: ${props => props.theme.secondary};
`;

export const LeftSide = styled.div`
  font-size: 20px;
  width: 40px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  color: ${props => props.theme.text};
  margin: 0 10px 0 0;
  p {
    color: ${props => props.theme.text};
  }
  i {
    cursor: ${props => (props.user ? "pointer" : "default")};
    color: ${props => (props.user ? props.theme.text : props.theme.lightGray)};
  }
`;

export const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Header = styled.div`
  font-weight: 400;
  margin-bottom: 8px;
  color: ${props => props.theme.link};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  p {
    font-size: 12px;
    margin-top: 6px;
  }
  span {
    color: #873d48;
    font-weight: 700;
  }
`;

export const Title = styled.a`
  font-size: 24px;
  font-weight: 700;
  padding: 0 5px 0 0;
  margin-bottom: 5px;
  color: ${props => props.theme.text};
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.header};
  }
`;

const FooterAccent = styled.div`
  font-weight: 500;
  padding: 5px;
  border-radius: 5px;
`;

export const Topic = styled(FooterAccent)`
  font-size: 14px;
  color: white;
  background-color: ${props => props.theme.aqua};

  display: inline-block;
`;

export const Score = styled(FooterAccent)`
  font-size: 20px;
  padding: 0;
  color: ${props => (props.noScore ? "grey" : props.theme.text)};
  margin-bottom: 10px;
`;

export const DescriptionWrapper = styled.div`
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-word;
  max-width: 300px;
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    word-wrap: break-word;
    word-break: break-word;
    color: ${props => props.theme.text};
  }
`;

export const UserNameWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 400;

  margin-right: 20px;

  a {
    padding-right: 4px;
    padding-left: 0px;
    font-weight: 700;
    margin-right: 4px;
    text-transform: capitalize;

    cursor: pointer;
    color: ${props => props.theme.accentText};
    &:hover {
      color: ${props => props.theme.aqua};
    }
  }
  i {
    color: ${props => props.theme.accentText};
    &:hover {
      color: ${props => props.theme.aqua};
    }
  }
  svg,
  i {
    cursor: pointer;
    font-size: 18px;
    padding-left: 4px;
  }
`;

export const User = styled.div`
  font-size: 12px;
  font-weight: 400;
  display: inline;
  /* line-height: 16px; */

  color: ${props => props.theme.accentRed};
  padding-left: 3px;
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
  font-size: 20px;
  svg {
    font-size: 30px;
  }
`;

export const FooterWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 12px;
  font-weight: 700;
  .cookie {
    &:hover {
      color: #875818;
    }
  }

  .pi-comments {
    color: ${props => (props.quizCount > 0 ? props.theme.pink : "grey")};
  }
`;

export const QuestionCount = styled.div`
  font-size: 12px;
  display: flex;
  border-radius: 4px;
  padding: 3px;
  color: ${props => props.theme.darkPink};
  .q {
    font-family: "Merienda One", cursive;
    padding: 4px 2px;
    font-size: 17px;
    color: ${props => props.theme.accentText};
  }
`;

export const MultiSelectWrapper = styled.div`
  width: 50%;
  .p-multiselect {
    height: 43px;
    display: flex;
    align-items: center;
  }
  .p-checkbox {
    display: none;
  }
  .p-inputtext:enabled:focus:not(.p-error) {
    border-color: ${props => props.theme.pink};
  }
  .p-multiselect-panel
    .p-multiselect-header
    .p-multiselect-filter-container
    .p-multiselect-filter-icon {
    color: ${props => props.theme.aqua};
  }
  .p-multiselect-panel .p-multiselect-items .p-multiselect-item.p-highlight {
    background-color: ${props => props.theme.pink};
  }
  .p-checkbox .p-checkbox-box.p-highlight {
    border-color: ${props => props.theme.aqua};
    background-color: ${props => props.theme.aqua};
  }
  .p-checkbox .p-checkbox-box.p-highlight:not(.p-disabled):hover {
    border-color: ${props => props.theme.darkAqua};
    background-color: ${props => props.theme.darkAqua};
  }
  .topics {
    margin-left: 4px;
  }
`;
