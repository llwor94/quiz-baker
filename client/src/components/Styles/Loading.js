import React from 'react';
import styled from 'styled-components';
import LoadingCroissant from '../../assets/loadingCroissant.svg';

const Wrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledLoading = styled.div`
	width: 100px;
	height: 100px;
	animation: lds-hourglass 3.7s infinite;
	margin-bottom: 300px;
	@keyframes lds-hourglass {
		0% {
			transform: rotate(0);
			animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
		}
		50% {
			transform: rotate(900deg);
			animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
		}
		100% {
			transform: rotate(1800deg);
		}
	}
`;

const Loading = () => (
	<Wrapper>
		<StyledLoading>
			<img src={LoadingCroissant} />
		</StyledLoading>
	</Wrapper>
);

export default Loading;
