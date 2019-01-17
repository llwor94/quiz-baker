import styled from 'styled-components';

export const Wrapper = styled.div`
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	padding: 12px;
	background-color: ${props => props.theme.secondary};
	margin-bottom: 10px;
	color: #333;
	display: flex;
	position: relative;
	justify-content: space-between;
	height: 200px;
	width: 450px;
	margin: 8px;
	background-color: #fff;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
		0 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

export const HatWrapper = styled.img`
	position: absolute;
	top: -20px;
	left: -20px;
	height: 40px;
	width: 40px;
	transform: rotate(-45deg);
	background-color: white;
`;

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

export const InnerWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const Header = styled.div`
	font-weight: 400;
	margin-bottom: 8px;
	color: ${props => props.theme.link};
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	p {
		font-size: 12px;
		margin-top: 6px;
	}
	span {
		color: #873d48;
		font-weight: 700;
	}
`;

export const Title = styled.a`
	font-size: 24px;
	font-weight: 700;
	padding: 0 5px 0 0;
	margin-bottom: 5px;
	color: ${props => props.theme.text};
	cursor: pointer;
	&:hover {
		color: ${props => props.theme.header};
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

export const Score = styled(FooterAccent)`
  font-size: 20px;
  padding: 0;
  color: ${props => (props.noScore ? 'grey' : props.theme.text)};
`;

export const DescriptionWrapper = styled.div`
	overflow: hidden;
	word-wrap: break-word;
	word-break: break-word;
	max-width: 300px;
	p {
		font-size: 14px;
		font-weight: 400;
		line-height: 21px;
		word-wrap: break-word;
		word-break: break-word;
		color: ${props => props.theme.text};
	}
`;

export const UserNameWrapper = styled.div`
	display: flex;
	align-items: flex-end;
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	margin-right: 20px;

	a {
		font-size: 12px;
		font-weight: 400;
		line-height: 16px;
		color: ${props => props.theme.accentRed};
		padding-left: 3px;
	}
`;

export const RightSide = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-end;
	height: 100%;
	font-size: 20px;
	svg {
		font-size: 30px;
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
