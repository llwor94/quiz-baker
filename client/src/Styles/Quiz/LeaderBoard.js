import styled from 'styled-components';

export const Wrapper = styled.div`
	${props => props.theme.fancyBorder};
	border-color: goldenrod;
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

	.firstPlace,
	.otherPlaces {
		${props => props.theme.flex(undefined, 'space-between', 'center')};
	}
`;

export const User = styled.div`
	${props => props.theme.flex(undefined, undefined, 'center')};
	.award {
		color: goldenrod;
		margin-left: 6px;
	}
`;
