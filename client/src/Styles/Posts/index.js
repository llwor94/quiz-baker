import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	margin: 70px 0;

	justify-content: center;
`;
export const CommentsWrapper = styled.div`
	flex-grow: 1;

	margin-left: 20px;

	border-left: 1px solid ${props => props.theme.pink};
`;
export const InnerWrapper = styled.div`
	position: fixed;
	max-width: 900px;
	width: 100%;
	background-color: ${props => props.theme.secondary};
	margin: 0;
	z-index: 100;
	padding: 10px 60px;
`;
