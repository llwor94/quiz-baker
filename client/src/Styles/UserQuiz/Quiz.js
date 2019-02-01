import styled from 'styled-components';

export const InnerWrapper = styled.div`
	${props => props.theme.flex('column')};
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
	/* border: 1px dashed ${props => props.theme.accent};
	box-shadow: 0 0 0 3px ${props => props.theme.secondary},
		0 0 0 5px ${props => props.theme.accent}, 0 0 0 10px ${props => props.theme.secondary},
		0 0 2px 10px #eee; */

	padding: 12px;
	background-color: ${props => props.theme.secondary};
	margin-bottom: 10px;
	padding: 40px;
	padding-bottom: ${props => props.edit && '20px'};
	position: ${props => props.edit && 'relative'};
	display: flex;
	flex-direction: ${props => (props.edit ? 'column' : 'row')};
	justify-content: ${props => props.secondary && 'space-between'};
	margin-bottom: ${props => (props.main ? '200px' : '10px')};
	align-items: ${props => props.edit || (props.secondary && 'center')};
	width: ${props => props.secondary && '400px'};
	&:hover {
		border-color: ${props => props.theme.pink};
	}

	.description {
		font-weight: 700;
	}
`;

export const Title = styled.div`
	font-size: 20px;
	font-family: "Merienda One", cursive;
	font-weight: 500;
	line-height: 22px;
	cursor: pointer;
	padding: 8px;
	padding-right: ${props => props.main && '10px'};
	display: inline-block;
	color: ${props => props.theme.accentRed};
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
