import styled from 'styled-components';

export const SplashWrapper = styled.div`
	/* display: flex;
	justify-content: flex-start; */
	position: relative;
	width: 505px;

	padding: 10px;
	border: 1px dashed #ddd;
	box-shadow: 0 0 0 3px ${props => props.theme.secondary}, 0 0 0 5px #ddd,
		0 0 0 10px ${props => props.theme.secondary}, 0 0 2px 10px #eee;
	border-radius: 3px;

	background-color: ${props => props.theme.secondary};
	strong {
		margin-bottom: 5px;
	}

	.inner {
		display: flex;
		justify-content: space-between;
		.body {
			flex-grow: 1;
		}
	}
	.back-btn {
		position: absolute;
		top: 2px;
		right: 527px;
		width: 35px;
	}

	@media (max-width: 505px) {
		width: 90%;
		margin: 0 5px;
	}
`;

export const SplashTitle = styled.div`
	font-size: 36px;
	font-family: "Merienda One", cursive;
	margin-bottom: 15px;
	color: ${props => props.theme.header};
`;

export const SplashHeader = styled.div`
	font-size: 18px;
	font-family: "Merienda One", cursive;
	margin-bottom: 15px;

	.topic {
		font-size: 14px;
		font-weight: 500;
		padding: 5px;
		border-radius: 5px;
		color: white;
		background-color: ${props => props.theme.aqua};
	}

	.author {
		color: ${props => props.theme.header};
	}
`;

export const SplashMidWrapper = styled.div`/* display: flex;
	justify-content: space-between; */`;

export const SplashDescription = styled.div`
	font-weight: 700;
	margin-bottom: 8px;
	padding-right: 2px;
`;

export const Fork = styled.img`max-height: 320px;`;

export const SplashFooter = styled.div`
	color: gray;
	margin-bottom: 15px;
	.questionCount {
		color: ${props => props.theme.aqua};
	}
	.score {
		color: ${props => props.theme.aqua};
	}
`;
