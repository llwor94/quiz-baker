import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
const countdown = keyframes`
  from {
    stroke-dashoffset: 0px;
  }
  to {
    stroke-dashoffset: 138;
  }
`;

const Countdown = styled.div`
	position: relative;
	${props => props.theme.square(60)};
	text-align: center;
	circle {
		stroke-dasharray: 138 138;
		stroke-dashoffset: 138;
		stroke-linecap: round;
		stroke-width: 4px;
		stroke: ${props => props.theme.pink};
		fill: none;
		animation: ${countdown} ${props => props.startCount}s linear infinite forwards;
	}
	svg {
		position: absolute;
		top: 0;
		right: 0;
		${props => props.theme.square(60)};
		transform: rotateY(-180deg) rotateZ(-90deg);
	}
`;

const Text = styled.div`
	display: inline-block;

	font-size: 14px;
	font-weight: 600;
	line-height: 60px;
`;

const Timer = ({ startCount, handleTimer, question, reset }) => {
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
		[ reset ],
	);
	if (reset) return <Countdown />;
	else
		return (
			<Countdown startCount={startCount}>
				<Text>{currentCount}</Text>
				<svg>
					<circle r='22' cx='30' cy='30' />
				</svg>
			</Countdown>
		);
};

export default Timer;
