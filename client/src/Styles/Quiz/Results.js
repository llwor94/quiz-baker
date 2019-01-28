import styled from "styled-components";

export const Wrapper = styled.div`
  border-radius: 4px;
  border: 1px solid;
  width: 500px;
  border-color: ${props => props.theme.accent};
  padding: 12px;
  background-color: ${props => props.theme.secondary};
  margin-bottom: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

export const SideColor = styled.div`
  min-width: 40px;
  background-color: ${props => (props.correct ? "#00ba96" : "#873D48")};

  i {
    cursor: pointer;
  }
`;

export const ResultWrapper = styled.div`
  display: flex;
  border: 1px solid lightgray;
`;

export const InnerWrapper = styled.div`
  padding: 8px;
  flex-grow: 1;
  max-width: 606px;
  h3 {
    margin-bottom: 15px;
  }
`;

export const NumberWrapper = styled.div`
  color: ${props => props.theme.link};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  h3 {
    padding: 5px;
  }
  span {
    padding: 0 10px;
  }
`;

export const FooterWrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin: 0 10px;
	&:hover{
		color: #875818;
	}
  }


  p {
    font-size: 30px;
  }
  i {
    font-size: 30px;
    cursor: pointer;

  }

  .pi-share-alt{
	  &:hover{
		  color: ${props => props.theme.aqua}
	  }
  }

  .vert {
    display: flex;
    align-items: center;
    margin: auto;
    span {
      margin: auto;
      text-align: center;
      margin: 0 10px 0 0;
    }
  }

  .vote{
	  margin-right: 15px;
  }
`;
