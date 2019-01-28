import styled from 'styled-components';

export const Wrapper = styled.div`
	border-radius: 4px;
	border: 1px dashed goldenrod;
	box-shadow: 0 0 0 3px ${props => props.theme.secondary}, 0 0 0 5px #ddd,
		0 0 0 10px ${props => props.theme.secondary}, 0 0 2px 10px #eee;

	padding: 12px;
	background-color: ${props => props.theme.secondary};
	margin-bottom: 10px;
	
	position: absolute;
	top: 11px;
	left: -8%;

	@media (max-width: 977px) {
		display: none;
	}
`;

export const UserWrapper = styled.div`
	width: 200px;
	margin: 10px 0;

	.firstPlace, .otherPlaces{
	display: flex;
	justify-content: space-between;
	align-items: center;

	}
`;

export const User = styled.div`
	display: flex;
	align-items: center;
	.award {
		color: goldenrod;
		margin-left: 6px;
	}
`;
