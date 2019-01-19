import styled from 'styled-components';

export const QuestionWrapper = styled.div`
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	padding: 12px;
	background-color: ${props => props.theme.secondary};
	margin-bottom: 10px;
	padding: 5px;
	padding-bottom: ${props => props.edit && '20px'};
	position: ${props => props.edit && 'relative'};
	display: flex;
	flex-direction: ${props => (props.secondary ? 'row' : 'column')};
	justify-content: ${props => props.secondary && 'space-between'};
	margin-bottom: ${props => (props.main ? '200px' : '10px')};
	align-items: ${props => props.edit || (props.secondary && 'center')};
	width: ${props => props.secondary && '500px'};
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
		0 2px 1px -1px rgba(0, 0, 0, 0.12);
	.no-questions {
		margin: 10px 0;
	}
`;

export const Wrapper = styled.div`
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	padding: 12px;
	background-color: ${props => props.theme.secondary};
	margin-bottom: 10px;
	position: relative;
`;

export const Title = styled.div`
	font-size: 18px;
	font-weight: 500;
	line-height: 22px;
	cursor: pointer;
	color: ${props => props.theme.text};
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
		&:hover {
			background-color: ${props => props.theme.darkAqua};
			border-color: ${props => props.theme.darkAqua};
		}
	}
`;

export const InputTitleWrapper = styled.div`padding: 20px;`;
