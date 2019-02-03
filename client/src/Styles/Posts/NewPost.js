import styled from 'styled-components';

export const NewPostWrapper = styled.div`
	${props => props.theme.flex(undefined, props.userPage ? 'center' : 'space-between')};
	width: 100%;

	.inner {
		${props => props.theme.flex('column')};
		width: 500px;
		position: relative;

		.p-autocomplete .p-autocomplete-panel {
			width: 160px;
			min-width: 160px;
		}
	}

	.modal {
		background-color: ${props => props.theme.secondary};
		${props => props.theme.fancyBorder};
		${props => props.theme.flex('column')};
		width: 500px;
		position: relative;

		.p-autocomplete .p-autocomplete-panel {
			width: 160px;
			min-width: 160px;
		}
	}
`;

export const InnerWrapper = styled.div`
	${props => props.theme.flex('column', undefined, 'flex-start')};
	width: 100%;
	border-radius: 4px;
	border: ${props => (props.userPage ? 'none' : '1px solid')};
	border-color: ${props => props.theme.accent};
	padding: 10px;
	background-color: ${props => props.theme.secondary};
`;
