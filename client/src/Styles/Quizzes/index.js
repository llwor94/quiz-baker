import styled from 'styled-components';
export const Wrapper = styled.div`
	max-width: 1000px;
	margin: 190px auto 0;
	.filters {
		padding: 0 30px;
		.p-dropdown {
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
`;
