import styled from 'styled-components';
export const Wrapper = styled.div`
	max-width: 1000px;
	margin: 190px auto 0;
	@media (max-width: 950px) {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.filters {
		display: flex;
		justify-content: space-between;
		padding: 0 30px;
		margin-bottom: 20px;
		@media (max-width: 950px) {
			width: 500px;
		}
		.p-dropdown {
			border-color: ${props => props.theme.accent};
			background: ${props => props.theme.secondary};
			display: flex;
			align-items: center;
			.p-inputtext {
				background: ${props => props.theme.secondary};
				color: ${props => props.theme.text};
			}
		}
		.p-dropdown .p-dropdown-panel {
			background-color: ${props => props.theme.secondary};
			border-color: ${props => props.theme.secondary};
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
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}
	@media (max-width: 915px) {
		margin-top: 90px;
	}
`;
