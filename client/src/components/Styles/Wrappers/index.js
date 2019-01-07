import styled from 'styled-components';

export const Wrapper = styled.div`
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	padding: 12px;
	background-color: ${props => props.theme.secondary};
	margin-bottom: 10px;
`;

export const QuestWrapper = styled(Wrapper)`
	padding: 5px;
	padding-bottom: ${props => props.edit && '20px'};
	position: ${props => props.edit && 'relative'};
	display: flex;
	flex-direction: ${props => (props.secondary ? 'row' : 'column')};
	justify-content: ${props => props.secondary && 'space-between'};
	margin-bottom: ${props => (props.main ? '200px' : '10px')};
	align-items: ${props => props.edit || (props.secondary && 'center')};
`;

export const PostWrapper = styled(Wrapper)`
	padding: 0 8px;
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;

	&:hover {
		border-color: rgb(129, 131, 132);
	}
`;
