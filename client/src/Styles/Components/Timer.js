import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import anime from 'animejs'

const Countdown = styled.div`
  position: relative;
  ${props => props.theme.square(60)};
  text-align: center;
  circle {
    stroke-dasharray: 138;
    stroke-dashoffset: 138;
    stroke-linecap: round;
    stroke-width: 4px;
    stroke: ${props => props.theme.pink};
    fill: none;
  }
  svg {
    position: absolute;
    top: 0;
    right: 0;
    ${props => props.theme.square(60)};
    transform: rotateY(-180deg) rotateZ(-90deg);
  }
`

const Text = styled.div`
  display: inline-block;

  font-size: 14px;
  font-weight: 600;
  line-height: 60px;
`

const countdown = startCount =>
  anime({
    targets: '.circle circle',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInQuad',
    duration: startCount * 1000,
    autoplay: false
  })

const Timer = ({ startCount, handleTimer, question, reset }) => {
  const [currentCount, setCount] = useState(startCount)

  const timer = () => setCount(currentCount - 1)
  useEffect(() => {
    countdown(startCount).play()
  }, [])
  useEffect(() => {
    setCount(startCount)
    countdown(startCount).restart()
  }, [question])

  useEffect(() => {
    if (currentCount <= 0) {
      setCount(startCount)
      countdown(startCount).pause()
      countdown(startCount).seek(0)
      handleTimer()
      return
    }
    if (currentCount === startCount) {
      countdown(startCount).restart()
    }
    const id = setInterval(timer, 1000)
    return () => clearInterval(id)
  }, [currentCount])

  useEffect(() => {
    setCount(startCount)
  }, [reset])
  if (reset) return <Countdown />
  else
    return (
      <Countdown startCount={startCount} className="countdown">
        <Text className="text">{currentCount}</Text>
        <svg className="circle">
          <circle r="22" cx="30" cy="30" />
        </svg>
      </Countdown>
    )
}

export default Timer
