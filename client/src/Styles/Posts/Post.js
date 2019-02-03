import styled from 'styled-components';

export const PostWrapper = styled.div`
	${props => props.theme.flex(undefined, 'space-between', 'center')};
	border-radius: 4px;
	border: 1px solid ${props => props.theme.accent};
	margin: ${props => (props.userPage ? '8px' : '8px 0')};
	position: relative;
	width: ${props => (props.userPage ? '400px' : '100%')};
	background-color: ${props => props.theme.secondary};
	padding: 8px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
		0 2px 1px -1px rgba(0, 0, 0, 0.12);

	&:hover {
		border-color: ${props => props.theme.pink};
	}
`;
export const CurrentWrapper = styled.div`
	border-radius: 17px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	background-color: ${props => props.theme.secondary};
	border-color: none;
	box-shadow: none;
	border-right: none;
	position: sticky;
	width: 522px;
	z-index: 30;
	top: 55px;
	bottom: 1px;
	padding: 1px;
	padding-left: 0;
`;
export const CurrentPost = styled(PostWrapper)`
  box-shadow: none;
  border-right: none;
  width: 506px;
  border-color: ${props => props.theme.pink};
  border-radius: 17px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
	padding-left: 13px;

  :after,
  :before {
    content: "";
    width: 15px;
    border: 1px solid ${props => props.theme.pink};
    position: absolute;
    right: -16px;
    border-left: 0;
  }

  :after {
    border-top: 0;
    border-radius: 0 0 5px 0;
    border-radius: 0 0 5px 0;
    top: -11px;
    height: 10px;
  }
  :before {
    border-bottom: 0;
    border-radius: 0 5px 0 0;
    border-radius: 0 5px 0 0;
    bottom: -11px;
    height: 10px;
  }
`;

export const HatWrapper = styled.img`
	position: absolute;
	top: -20px;
	left: -20px;
	${props => props.theme.square(40)};
	transform: rotate(-45deg);
	background-color: ${props => props.theme.secondary};
`;

export const InnerWrapper = styled.div`
	padding: 8px 0;
    margin: 0 8px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

	.body {
		display: flex;
		flex-grow: 1;
	}
`;

export const BodyWrapper = styled.div`
	max-height: ${props => !props.post && '250px'};
	overflow: hidden;
	cursor: ${props => (props.quiz ? 'default' : 'pointer')};
	max-width: 420px;
	p {
		font-size: 14px;
		font-weight: 400;
		line-height: 19px;
		mask-image: ${props => !props.post && 'linear-gradient(180deg, #000 60%, transparent)'};
		color: ${props => props.theme.text};
		word-wrap: break-word;
		width: 90%;
		max-height: 100px;
		margin: 15px 0;
	}

	span{
		color: ${props => props.theme.pink};
	}

	.header {
		${props => props.theme.flex(undefined, 'space-between', 'center')};
		.text {
			padding-left: 3px;
		}
	}
`;
export const Header = styled.div`
	font-weight: 400;
	line-height: 16px;
	${props => props.theme.flex(undefined, 'space-between', 'center')};
	margin-bottom: 8px;
	color: ${props => props.theme.link};
	a {
		color: ${props => props.theme.accentRed};
		padding-left: 3px;
	}
`;

export const FooterWrapper = styled.div`
	${props => props.theme.flex(undefined, 'space-between', 'flex-end')};
	font-weight: 700;
	max-width: 421px;
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

	.expandComments {
		background-color: #e3d3e4;
		border-radius: 5px;
		position: relative;

		&:after {
			content: "";
			position: absolute;
			bottom: 0;
			left: 50%;
			width: 0;
			height: 0;
			border: 26px solid transparent;
			border-top-color: #e3d3e4;
			border-bottom: 0;
			border-right: 0;
			margin-left: -9.5px;
			margin-bottom: -15px;
		}

		img {
			padding: 8px;
			${props => props.theme.square(60)};
			cursor: pointer;
			transform: scaleX(-1)
				${props => (props.isCollapsed ? `rotate(-15deg)` : `rotate(0deg)`)};
		}
	}
	.cookie {
		&:hover {
			color: #875818;
		}
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
	word-break: break-word;
`;

export const Topic = styled.div`
	font-size: 14px;
	color: white;
	background-color: ${props => props.theme.aqua};
	margin: 15px 10px 0 0;
	display: inline-block;
	font-weight: 500;
	padding: 5px;
	border-radius: 5px;
`;

export const CommentWrapper = styled.div`width: 100%;`;

export const LeftSide = styled.div`
	font-size: ${props => (props.quiz ? '15px' : '20px')};
	width: 40px;
	${props => props.theme.flex('column', 'center', 'center')};
	background-color: transparent;
	margin: 0 10px 0 0;
	i {
		cursor: ${props => (props.user ? 'pointer' : 'default')};
	}
`;
