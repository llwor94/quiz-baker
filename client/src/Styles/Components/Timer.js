import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
const countdown = keyframes`
  from {
    stroke-dashoffset: 0px;
  }
  to {
    stroke-dashoffset: 151px;
  }
`;

const Countdown = styled.div`
	position: absolute;
	width: 52px;
	height: 52px;
`;
const Circle = styled.div`
	circle {
		stroke-dasharray: 151px;
		stroke-dashoffset: 151px;
		stroke-linecap: butt;
		stroke-width: 4px;
		stroke: ${props => props.theme.pink};
		fill: white;
		animation: ${countdown} ${props => props.startCount}s linear infinite;
	}
	svg {
		width: 52px;
		height: 52px;
		transform: rotateZ(-90deg);
	}
`;

const Text = styled.div`
	position: absolute;
	top: 17px;
	width: 52px;

	font-size: 14px;
	font-weight: 600;
	text-align: center;
`;

const Timer = ({ startCount, handleTimer, question }) => {
	const [ currentCount, setCount ] = useState(startCount);
	const timer = () => setCount(currentCount - 1);

	useEffect(
		() => {
			if (currentCount <= 0) {
				setCount(startCount);
				handleTimer();
				return;
			}
			const id = setInterval(timer, 1000);
			return () => clearInterval(id);
		},
		[ currentCount ],
	);

	useEffect(
		() => {
			setCount(startCount);
		},
		[ question ],
	);

	return (
		<Countdown>
			<Circle startCount={startCount}>
				<svg>
					<circle r='24' cx='26' cy='26' />
				</svg>
			</Circle>
			<Text>{currentCount}</Text>
		</Countdown>
	);
};

export default Timer;
