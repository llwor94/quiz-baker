import styled from 'styled-components';

export const SplashWrapper = styled.div`
	/* display: flex;
	justify-content: flex-start; */
	position: relative;
	width: 500px;
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
