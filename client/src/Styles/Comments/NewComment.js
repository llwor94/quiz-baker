import styled from 'styled-components';

export const NewCommentArea = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	padding: 20px 10px;
	position: relative;
	background-color: ${props => props.theme.secondary};
`;
