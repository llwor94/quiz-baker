import styled from 'styled-components';

export const Wrapper = styled.div`
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	padding: 5px;
	padding-bottom: ${props => props.edit && '20px'};
	background-color: ${props => props.theme.secondary};
	position: ${props => props.edit && 'relative'};
	display: flex;
	flex-direction: column;
	margin-bottom: ${props => (props.main ? '200px' : '10px')};
	align-items: ${props => props.edit && 'center'};
`;
