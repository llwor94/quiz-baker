import styled from 'styled-components';
export const Wrapper = styled.div`
	max-width: 1000px;
	margin: 190px auto 0;
	.filters {
		display: flex;
		justify-content: space-between;
		padding: 0 30px;
		margin-bottom: 20px;
		.p-dropdown {
			border-color: ${props => props.theme.accent};
			display: flex;
			align-items: center;
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
