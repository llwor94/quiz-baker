import styled from 'styled-components';
export const Wrapper = styled.div`
	max-width: 1000px;
	margin: 190px auto 0;
	@media (max-width: 950px) {
		${props => props.theme.flex('column', undefined, 'center')};
	}

	.filters {
		${props => props.theme.flex(undefined, 'space-between')};
		padding: 0 30px;
		margin-bottom: 20px;
		@media (max-width: 950px) {
			width: 500px;
		}
		.p-dropdown {
			border-color: ${props => props.theme.accent};
			background: ${props => props.theme.secondary};
			${props => props.theme.flex(undefined, undefined, 'center')};
			.p-inputtext {
				background: ${props => props.theme.secondary};
				color: ${props => props.theme.text};
			}
		}
		.p-dropdown .p-dropdown-panel {
			${props => props.theme.backgroundBorder(props.theme.secondary)};
		}
		.p-dropdown-panel .p-dropdown-items .p-dropdown-item {
			color: ${props => props.theme.text};
		}
		.p-dropdown-panel
			.p-dropdown-items
			.p-dropdown-item:not(.p-highlight):not(.p-disabled):hover {
			background-color: ${props => props.theme.main};
			color: ${props => props.theme.text};
		}
		.p-dropdown .p-dropdown-trigger {
			background: ${props => props.theme.secondary};
			color: ${props => props.theme.accent};
		}
		.p-dropdown:not(.p-disabled):hover {
			border-color: ${props => props.theme.accent};
		}
		.p-dropdown:not(.p-disabled):focus {
			border-color: ${props => props.theme.pink};
		}
		.p-dropdown:not(.p-disabled).p-focus {
			border-color: ${props => props.theme.pink};
		}
		.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
			background-color: ${props => props.theme.pink};
		}
	}
	.quizzes {
		width: 100%;
		${props => props.theme.flex(undefined, 'center', 'center')};
		flex-wrap: wrap;
	}
	@media (max-width: 915px) {
		margin-top: 90px;
	}
`;
