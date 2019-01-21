import styled from 'styled-components';
export const ModalWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.4);
	position: absolute;
	left: 0;
	top: 0;
	z-index: 100;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const Wrapper = styled.div`
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	padding: 5px;
	position: absolute;
	background-color: ${props => props.theme.secondary};
	margin-bottom: 10px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
		0 2px 1px -1px rgba(0, 0, 0, 0.12);
	padding-bottom: ${props => props.edit && '20px'};
	position: ${props => props.edit && 'relative'};
	display: flex;
	flex-direction: ${props => (props.secondary ? 'row' : 'column')};
	justify-content: ${props => props.secondary && 'space-between'};
	margin-bottom: ${props => (props.main ? '200px' : '10px')};
	align-items: ${props => props.edit || (props.secondary && 'center')};
	/* width: ${props => props.secondary && '500px'}; */
	width: 30%;
	padding: 40px;
	.p-ampm-picker {
		display: none;
	}
`;

export const InnerWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px;
`;
