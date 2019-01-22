import styled from 'styled-components';

export const PostWrapper = styled.div`
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	margin: ${props => (props.userPage ? '8px' : '8px 0')};
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: ${props => (props.userPage ? '400px' : '100%')};
	background-color: ${props => props.theme.secondary};
	padding: 8px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
		0 2px 1px -1px rgba(0, 0, 0, 0.12);

	&:hover {
		border-color: ${props => props.theme.pink};
	}
	.p-growl .p-growl-item-container.p-growl-message-info {
		background-color: ${props => props.theme.aqua};
		font-family: 'Raleway', sans-serif !important;
		border-radius: 4px;
		color: white;
		opacity: .75;
	}
	.p-growl .p-growl-item-container.p-growl-message-info .p-growl-image {
		display: none;
	}
	.p-growl .p-growl-item-container.p-growl-message-info .p-growl-icon-close {
		color: white;
	}
`;

export const HatWrapper = styled.img`
	position: absolute;
	top: -20px;
	left: -20px;
	height: 40px;
	width: 40px;
	transform: rotate(-45deg);
	background-color: ${props => props.theme.secondary};
`;

export const InnerWrapper = styled.div`
	padding: 8px 0;
	margin: 0 8px;
	width: 100%;
`;

export const BodyWrapper = styled.div`
	max-height: ${props => !props.post && '250px'};
	overflow: hidden;
	cursor: ${props => (props.quiz ? 'default' : 'pointer')};
	max-width: 420px;
	p {
		font-size: 14px;
		font-weight: 400;
		line-height: 21px;
		mask-image: ${props => !props.post && 'linear-gradient(180deg, #000 60%, transparent)'};
		color: ${props => props.theme.text};
		word-wrap: break-word;
	}
`;
export const Header = styled.div`
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	display: flex;
	justify-content: space-between;
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
	justify-content: space-between;
	font-size: 12px;
	font-weight: 700;
	a {
		padding-right: 4px;
		margin-right: 4px;
		text-transform: capitalize;
		cursor: pointer;
		color: ${props => props.theme.accentText};
		&:hover {
			color: ${props => props.theme.pink};
		}
	}
	i {
		color: ${props => props.theme.accentText};
		&:hover {
			color: ${props => props.theme.aqua};
		}
	}
	svg,
	i {
		cursor: pointer;
		font-size: 18px;
		padding-left: 4px;
	}
`;

export const CommentCount = styled.div`
	color: ${props => props.theme.aqua};
	padding-right: 2px;
	margin-right: 2px;
`;

export const Title = styled.div`
	font-size: 18px;
	font-weight: 500;
	line-height: 22px;

	color: ${props => props.theme.text};
`;

export const Topic = styled.div`
	font-size: 14px;
	color: white;
	background-color: ${props => props.theme.aqua};
	margin-right: 10px;
	display: inline-block;
	font-weight: 500;
	padding: 5px;
	border-radius: 5px;
`;

export const CommentWrapper = styled.div`width: 100%;`;

export const LeftSide = styled.div`
	font-size: 20px;
	width: 40px;
	justify-content: center;
	align-items: center;
	display: flex;
	flex-direction: column;
	background-color: transparent;
	color: ${props => props.theme.text};
	margin: 0 10px 0 0;

	i {
		cursor: ${props => (props.user ? 'pointer' : 'default')};
	}
`;
