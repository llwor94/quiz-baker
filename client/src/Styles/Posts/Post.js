import styled from 'styled-components';

export const PostWrapper = styled.div`
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	padding: 0 8px;
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 500px;
	background-color: ${props => props.theme.secondary};
	margin: 8px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
		0 2px 1px -1px rgba(0, 0, 0, 0.12);

	&:hover {
		border-color: rgb(129, 131, 132);
	}
`;

export const InnerWrapper = styled.div`
	padding: 8px 0;
	margin: 0 8px;
`;

export const BodyWrapper = styled.div`
	max-height: 250px;
	overflow: hidden;
	cursor: pointer;

	p {
		font-size: 14px;
		font-weight: 400;
		line-height: 21px;
		mask-image: linear-gradient(180deg, #000 60%, transparent);
		color: ${props => props.theme.text};
	}
`;
export const Header = styled.div`
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	display: flex;
	align-items: center;
	margin-bottom: 8px;
	color: ${props => props.theme.link};
	a {
		color: ${props => props.theme.accentRed};
		padding-left: 3px;
	}
`;

export const FooterWrapper = styled.div`
	display: flex;
	align-items: flex-end;
	font-size: 12px;
	font-weight: 700;
	a {
		padding-right: 4px;
		margin-right: 4px;
		text-transform: capitalize;
		cursor: pointer;
		color: ${props => props.theme.accentText};
	}
`;

export const CommentCount = styled.div`
	color: ${props => props.theme.aqua};
	padding-right: 4px;
	margin-right: 4px;
`;

export const Title = styled.div`
	font-size: 18px;
	font-weight: 500;
	line-height: 22px;
	cursor: pointer;
	color: ${props => props.theme.text};
`;
