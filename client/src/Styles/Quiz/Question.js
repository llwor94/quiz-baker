import styled from 'styled-components';

export const Wrapper = styled.div`

	width: 500px;
	.inner{
	position: relative;
	border-radius: 3px;
	
	/* border: 1px solid;
	border-color: ${props => props.theme.accent}; */
	padding: 12px;
	background-color: ${props => props.theme.secondary};
	margin-bottom: 10px;

	border: 1px dashed #ddd;
	box-shadow: 0 0 0 3px ${props => props.theme.secondary}, 0 0 0 5px #ddd, 0 0 0 10px ${props =>
	props.theme.secondary}, 0 0 2px 10px #eee;

	.wrapper {
		opacity: 0;
	}
	
	}
	@media (max-width: 505px) {
		width: 90%;
		margin: 0 5px;
	}
	/* box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
		0 2px 1px -1px rgba(0, 0, 0, 0.12); */
`;

export const QuestionWrapper = styled.div`
	color: ${props => props.theme.aqua};
	font-size: 24px;
	font-weight: 700;
	padding: 0 5px 0 0;
`;

export const AnswerWrapper = styled.div`
	margin-top: 15px;
	height: 80%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const Answer = styled.div`
	padding-top: 4px;
	margin-left: 70px;
	&:not(:last-child) {
		padding-bottom: 10px;
	}

	.p-radiobutton .p-radiobutton-box.p-highlight {
		background-color: #dc758f;
		border: #dc758f;

		&:not(.p-disabled):hover {
			background-color: #ad546b;
			border: #ad546b;
		}
	}
`;

export const Label = styled.label`
	font-size: 14px;
	font-weight: 400;
	line-height: 21px;
	padding-left: 4px;
	color: ${props => props.theme.text};
`;

export const Logo = styled.div`
	position: absolute;
	bottom: 0;
	right: 0;
	margin: 0 5px 5px 0;
	span {
		font-size: 36px;
		font-family: "Merienda One", cursive;
	}
	.Q {
		color: ${props => props.theme.accentRed};
	}

	.B {
		color: ${props => props.theme.aqua};
	}
`;
