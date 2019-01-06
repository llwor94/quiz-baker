import styled from 'styled-components';

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
