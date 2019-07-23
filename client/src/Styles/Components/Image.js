import React from 'react'
import styled from 'styled-components'
import blankProfile from '../../assets/blank-profile.png'

import { userImage } from '../../utils/imgArray'

const IconWrapper = styled.div`
  background-color: ${props => props.theme.accent};

  ${props => props.theme.square(40)};
  border-radius: 10px;
`
const StyledIcon = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: ${props => props.image && '100%'};
  height: ${props => props.image && '100%'};
  margin: ${props => !props.image && '5px'};
  border-radius: 10px;
  opacity: ${props => !props.image && '.5'};
`
export const ProfileIcon = ({ src }) => {
  return (
    <IconWrapper>
      <StyledIcon src={src ? src : Object.values(userImage())[0]} image={src} />
    </IconWrapper>
  )
}

const StyledImage = styled.img`
  ${props => props.theme.square(130)};
  border-radius: 10px;
  z-index: 1000;
`

export const LargeImage = ({ src }) => <StyledImage src={src ? src : blankProfile} />

const BiggerImage = styled.img`
  ${props => props.theme.square(350)};
  border-radius: 10px;
  z-index: 1000;
`
export const HugeImage = ({ src }) => <BiggerImage src={src ? src : blankProfile} />
