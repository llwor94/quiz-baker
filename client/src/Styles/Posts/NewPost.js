import styled from 'styled-components';

export const NewPostWrapper = styled.div`
	display: flex;
	width: 100%;

	justify-content: space-between;
	position: relative;

	.inner {
		display: flex;
		flex-direction: column;
		width: 100%;
		.p-autocomplete .p-autocomplete-panel {
			width: 160px;
			min-width: 160px;
		}
	}
`;

export const InnerWrapper = styled.div`
	display: flex;
	width: 100%;
	border-radius: 4px;
	align-items: flex-start;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	flex-direction: column;
	padding: 10px;

	background-color: ${props => props.theme.secondary};
`;
