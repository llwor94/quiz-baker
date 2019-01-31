import styled from "styled-components";

export const QuestionWrapper = styled.div`
  border-radius: 4px;
  border: 1px dashed #ddd;
  box-shadow: 0 0 0 3px ${props => props.theme.secondary}, 0 0 0 5px #ddd,
    0 0 0 10px ${props => props.theme.secondary}, 0 0 2px 10px #eee;
  border-color: ${props => props.theme.accent};
  padding: 12px;
  background-color: ${props => props.theme.secondary};
  margin-bottom: 10px;
  margin-top: 20px;
  padding: 5px;
  padding-bottom: ${props => props.edit && "20px"};
  position: ${props => props.edit && "relative"};
  display: flex;
  flex-direction: ${props => (props.secondary ? "row" : "column")};
  justify-content: ${props => props.secondary && "space-between"};
  margin-bottom: ${props => (props.main ? "200px" : "10px")};
  align-items: ${props => props.edit || (props.secondary && "center")};
  width: ${props => props.secondary && "500px"};
  .no-questions {
    margin: 10px 0;
  }
`;

export const Wrapper = styled.div`
  border-radius: 4px;
  border: 1px solid;
  border-color: ${props => props.theme.accent};
  padding: 40px;
  background-color: ${props => props.theme.secondary};
  margin-bottom: 10px;
  position: relative;

  li{
	  margin-bottom: 10px;
	  padding: 5px;
	  border-radius: 5px;
	  list-style-type: none;
  }
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  cursor: pointer;
  color: gray;
  margin-bottom: 20px;
`;

export const EditWrapper = styled(Wrapper)`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	box-shadow: none;
	.p-togglebutton.p-highlight {
		background-color: ${props => props.theme.aqua};
		border-color: ${props => props.theme.aqua};
		color: #ffffff;
		&:hover {
			background-color: ${props => props.theme.darkAqua};
			border-color: ${props => props.theme.darkAqua};
			color: #ffffff;
		}
		/* background-color: ${props => props.theme.pink};
		border-color: ${props => props.theme.pink};
		&:hover {
			background-color: ${props => props.theme.darkPink};
			border-color: ${props => props.theme.darkPink};
		} */
	}
	.p-togglebutton:not(.p-disabled):not(.p-highlight) {
		background-color: ${props => props.theme.aqua};
		border-color: ${props => props.theme.aqua};
		color: #ffffff;
		&:hover {
			background-color: ${props => props.theme.darkAqua};
			border-color: ${props => props.theme.darkAqua};
			color: #ffffff;
		}
	}
`;

export const InputTitleWrapper = styled.div`
  padding: 20px;
`;
