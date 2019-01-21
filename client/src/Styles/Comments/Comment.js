import styled from 'styled-components';

export const CommentArea = styled.div`
	padding: 0 16px;
	border-radius: 4px;
	border: 1px solid;
	width: 500px;
	border-color: ${props => props.theme.accent};

	margin: 10px 0;
	background-color: ${props => props.theme.secondary};
`;

export const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: 1px solid;
	border-color: ${props => props.theme.accent};

	width: 100%;
	overflow: visible;
	transition: background 1s ease 0s;
	margin-top: 11px;
	padding-top: 5px;
	margin-bottom: 5px;
`;

export const CommentHeader = styled.div`
	display: flex;
	font-size: 12px;
	font-weight: 400;
	align-items: center;
	line-height: 16px;
	min-height: 18px;
	color: ${props => props.theme.link};

	span {
		font-size: 12px;
		font-weight: 400;
		line-height: 16px;

		flex: 0 0 auto;
	}

	p{
		max-width: 300px;
		margin: 15px 0;
	}

	img{
		width: 40px;
	}
`;

export const UserName = styled.a`
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	color: ${props => props.theme.accentRed};
	padding-left: 3px;
	margin-right: 10px;
`;

export const CommentBody = styled.div`
	padding: 2px 0;
	width: 100%;
	font-size: 14px;
	font-weight: 400;
	line-height: 21px;
	overflow: auto;
`;

export const CommentWrapper = styled.div`
	margin-bottom: 40px;
	width: 100%;
	padding: 10px;
	border: 1px solid ${props => props.theme.lightGray};
	border-radius: 4px;
`;

export const PostComment = styled.div`
	display: flex;
	align-items: center;
`;

export const RightSide = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: flex-end;
	height: 56px;
	div{
		font-size: 10px;
		color: ${props => props.theme.gray};
		margin-top: 5px;

	}
`;