import styled from 'styled-components';

export const InnerWrapper = styled.div`
	flex-grow: 1;
	position: relative;
	margin: 8px;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
`;

export const Header = styled.div`
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	display: flex;
	align-items: center;
	color: ${props => props.theme.link};
	margin-bottom: 5px;
	a {
		font-weight: 700;
		color: ${props => props.theme.text};
	}
`;

export const DescriptionWrapper = styled.div`
	overflow: hidden;
	word-wrap: break-word;
	word-break: break-word;
	p {
		font-size: 14px;
		font-weight: 400;
		line-height: 21px;
		word-wrap: break-word;
		word-break: break-word;
		color: ${props => props.theme.text};
	}
`;

export const Wrapper = styled.div`
	border-radius: 4px;
	width: 400px;
	border: 1px dashed ${props => props.theme.accent};
	box-shadow: 0 0 0 3px ${props => props.theme.secondary},
		0 0 0 5px ${props => props.theme.accent}, 0 0 0 10px ${props => props.theme.secondary},
		0 0 2px 10px #eee;
	padding: 12px;
	background-color: ${props => props.theme.secondary};
	margin: 8px;
	display: flex;
	height: 140px;
	margin-bottom: 10px;
	&:hover {
		border-color: ${props => props.theme.pink};
	}

	.p-dialog .p-dialog-titlebar {
		text-align: right;
	}
	.p-dialog .p-dialog-titlebar-icons {
		float: none;
	}
	.p-dialog .p-dialog-content {
		padding: 10px 20px;
		font-size: 15px;
		line-height: 22px;
	}
	.p-dialog .p-dialog-footer {
		padding: 16px;
	}
	.p-dialog .p-dialog-footer button {
		margin-left: 10px;
	}
`;

export const FooterWrapper = styled.div`
	display: flex;
	align-items: flex-end;
	font-size: 12px;
	font-weight: 700;
	justify-content: space-between;
	a {
		text-transform: capitalize;
		cursor: pointer;
		color: ${props => props.theme.accentText};
	}
`;

export const Title = styled.a`
	font-size: 24px;
	font-weight: 700;
	margin-right: 10px;
	margin-bottom: 5px;
	color: ${props => props.theme.text};
	cursor: pointer;
	&:hover {
		color: ${props => props.theme.darkPink};
	}
`;
const FooterAccent = styled.div`
	font-weight: 500;
	padding: 5px;
	border-radius: 5px;
`;

export const Topic = styled(FooterAccent)`
  font-size: 14px;
  color: white;
  background-color: ${props => props.theme.aqua};
  margin-right: 10px;
  display: inline-block;
`;
