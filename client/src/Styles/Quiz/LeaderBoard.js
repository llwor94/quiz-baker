import styled from 'styled-components';

export const Wrapper = styled.div`
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	padding: 12px;
	background-color: ${props => props.theme.secondary};
	margin-bottom: 10px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
		0 2px 1px -1px rgba(0, 0, 0, 0.12);
	position: absolute;
	top: 0;
	left: 0;

	@media (max-width: 977px) {
		display: none;
	}
`;

export const UserWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 200px;
	margin: 10px 0;
	img {
		height: 30px;
		width: 30px;
		border-radius: 50%;
		margin-right: 4px;
	}
`;

export const User = styled.div`
	display: flex;
	align-items: center;
`;
