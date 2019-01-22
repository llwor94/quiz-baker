import styled from 'styled-components';

export const Wrapper = styled.div`
	background-color: ${props => props.theme.secondary};
	text-align: center;
	padding: 20px;
	p {
		font-size: 20px;
		padding: 10px;
	}
`;

export const UploadImageWrapper = styled.div``;

export const WelcomeWrapper = styled.div`
	margin-top: 100px;
	text-align: center;
	h1 {
		font-family: 'Merienda One', cursive;
		font-size: 30px;
		color: ${props => props.theme.aqua};
		padding: 10px;
	}
	p {
		padding: 10px;
		font-size: 20px;
	}
	.or {
		padding: 10px;
		font-weight: bold;
		color: ${props => props.theme.aqua};
	}
`;
