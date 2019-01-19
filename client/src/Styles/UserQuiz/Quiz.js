import styled from 'styled-components';

export const InnerWrapper = styled.div`
	display: flex;
	flex-direction: column;

	a {
		font-weight: 700;
		color: ${props => props.theme.text};
		padding: 0 8px 8px;
	}

	p {
		margin: 5px;
	}
`;

export const Wrapper = styled.div`
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	padding: 12px;
	background-color: ${props => props.theme.secondary};
	margin-bottom: 10px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
		0 2px 1px -1px rgba(0, 0, 0, 0.12);
	padding: 5px;
	padding-bottom: ${props => props.edit && '20px'};
	position: ${props => props.edit && 'relative'};
	display: flex;
	flex-direction: ${props => (props.edit ? 'column' : 'row')};
	justify-content: ${props => props.secondary && 'space-between'};
	margin-bottom: ${props => (props.main ? '200px' : '10px')};
	align-items: ${props => props.edit || (props.secondary && 'center')};
	width: ${props => props.secondary && '500px'};
`;

export const Title = styled.div`
	font-size: 18px;
	font-weight: 500;
	line-height: 22px;
	cursor: pointer;
	padding: 8px;
	padding-right: ${props => props.main && '10px'};
	display: inline-block;
	color: ${props => (props.correct ? 'green' : props.theme.text)};
`;

export const Topic = styled.div`
	font-size: 14px;
	color: white;
	background-color: ${props => props.theme.aqua};
	margin-right: 10px;
	display: inline-block;
	font-weight: 500;
	padding: 5px;
	border-radius: 5px;
`;
