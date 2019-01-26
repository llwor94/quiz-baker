import styled from 'styled-components';

export const QuizFormWrapper = styled.div`
	width: 60%;

	p {
		font-family: 'Merienda One', cursive;
	}
	.p-button {
		background-color: ${props => props.theme.aqua};
		border-color: ${props => props.theme.aqua};
	}
	.p-button:enabled:hover {
		background-color: ${props => props.theme.darkAqua};
		border-color: ${props => props.theme.darkAqua};
	}
	.p-inputtext:enabled:focus:not(.p-error) {
		border-color: ${props => props.theme.aqua};
	}
`;
