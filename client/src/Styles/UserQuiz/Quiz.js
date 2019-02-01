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
	background-color: ${props => props.theme.secondary};
	margin-bottom: 10px;
	padding: 40px;
	padding-bottom: ${props => props.edit && '20px'};
	position: ${props => props.edit && 'relative'};
	${props => props.theme.flex(props.edit ? 'column' : 'row', 'space-between', 'center')};
	width: ${props => props.secondary && '400px'};
	${props => props.theme.fancyBorder};
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
