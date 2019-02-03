import styled from 'styled-components';

export const QuizFormWrapper = styled.div`
	width: ${props => (props.create ? '60%' : '100%')};

	p {
		font-family: 'Merienda One', cursive;
		font-size: 20px;
	}
	.p-button {
		${props => props.theme.backgroundBorder(props.theme.aqua)};
	}
	.p-button:enabled:hover {
		${props => props.theme.backgroundBorder(props.theme.darkAqua)};
	}
	.p-inputtext:enabled:focus:not(.p-error) {
		border-color: ${props => props.theme.aqua};
	}
	.p-dropdown {
		margin: 10px 0;
		border-color: ${props => props.theme.accent};
		background-color: ${props => props.theme.secondary};
		.p-inputtext {
			background: ${props => props.theme.secondary};
			color: ${props => props.theme.text};
		}
	}
	.p-dropdown:not(.p-disabled):focus {
		border-color: ${props => props.theme.aqua};
	}
	.p-dropdown:not(.p-disabled).p-focus {
		border-color: ${props => props.theme.aqua};
	}
	.p-dropdown:not(.p-disabled):hover {
		border-color: ${props => props.theme.accent};
	}
	.p-dropdown .p-dropdown-trigger {
		background-color: ${props => props.theme.secondary};
		color: ${props => props.theme.accent};
	}
	.p-dropdown .p-dropdown-panel {
		${props => props.theme.backgroundBorder(props.theme.secondary)};
	}
	.p-dropdown-panel .p-dropdown-items .p-dropdown-item {
		color: ${props => props.theme.text};
	}
	.p-dropdown-panel .p-dropdown-items .p-dropdown-item:not(.p-highlight):not(.p-disabled):hover {
		background-color: ${props => props.theme.main};
		color: ${props => props.theme.text};
	}
	.p-dropdown .p-dropdown-trigger {
		background: ${props => props.theme.secondary};
		color: ${props => props.theme.accent};
	}

	.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
		background-color: ${props => props.theme.pink};
	}
`;
