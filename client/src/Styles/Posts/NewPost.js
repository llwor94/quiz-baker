import styled from 'styled-components';

export const NewPostWrapper = styled.div`
	display: flex;
	width: 100%;

	justify-content: ${props => (props.userPage ? 'center' : 'space-between')};

	.inner {
		display: flex;
		flex-direction: column;
		width: 500px;
		
	
		position: relative;
		.p-autocomplete .p-autocomplete-panel {
			width: 160px;
			min-width: 160px;
		}
	}

	.modal {
		background-color: ${props => props.theme.secondary};
		border: 1px dashed #ddd;
		box-shadow: 0 0 0 3px #fff, 0 0 0 5px #ddd, 0 0 0 10px #fff, 0 0 2px 10px #eee;
		border-color: ${props => props.theme.accent};
		
		display: flex;
		flex-direction: column;
		width: 500px;
		position: relative;
		.p-autocomplete .p-autocomplete-panel {
			width: 160px;
			min-width: 160px;
		}
		/* .p-autocomplete .p-component {
			background-color: ${props => props.theme.secondary};
		} */
		
	}
`;

export const InnerWrapper = styled.div`
	display: flex;
	width: 100%;
	border-radius: 4px;
	align-items: flex-start;
	border: ${props => (props.userPage ? 'none' : '1px solid')};
	border-color: ${props => props.theme.accent};
	flex-direction: column;
	padding: 10px;

	background-color: ${props => props.theme.secondary};
`;
