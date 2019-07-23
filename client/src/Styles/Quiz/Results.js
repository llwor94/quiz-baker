import styled from 'styled-components'

export const Wrapper = styled.div`
  border: 1px solid ${props => props.theme.accent};
  width: 500px;
  padding: 12px;
  background-color: ${props => props.theme.secondary};
  margin-bottom: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  @media (max-width: 500px) {
    width: 100%;
  }
`

export const SideColor = styled.div`
  min-width: 40px;
  background-color: ${props => (props.correct ? props.theme.aqua : props.theme.accentRed)};
  i {
    cursor: pointer;
  }
`

export const ResultWrapper = styled.div`
  display: flex;
  border: 1px solid ${props => props.theme.accent};
  background-color: ${props => props.theme.secondary};
`

export const InnerWrapper = styled.div`
  padding: 8px;
  flex-grow: 1;
  max-width: 606px;
  h3 {
    margin-bottom: 15px;
  }
`

export const NumberWrapper = styled.div`
  color: ${props => props.theme.link};
  ${props => props.theme.flex(undefined, 'flex-end', 'center')};
  h3 {
    padding: 5px;
  }
  span {
    padding: 0 10px;
  }
`

export const FooterWrapper = styled.div`
	${props => props.theme.flex(undefined, undefined, 'center')};
	.icon-wrapper {
		${props => props.theme.flex(undefined, undefined, 'center')};
		
	}
	svg {
		margin: 0 5px;
		color: ${props => props.theme.link};
		/* &:hover {
			color: #875818;
		} */
	}
	p {
		font-size: 14px;
		
	}
	i {
		font-size: 30px;
		cursor: pointer;
		color: ${props => props.theme.link};
	}

	/* .pi-share-alt {
		&:hover {
			color: ${props => props.theme.aqua};
		} */
	

	.vert {
		${props => props.theme.flex(undefined, undefined, 'center')};
		margin: auto;
		span {
			margin: auto;
			text-align: center;
			margin: 0 10px 0 0;
		}
	}

	.vote {
		margin-right: 10px;
		/* ${props => props.theme.flex(undefined, undefined, 'center')}; */
		i {
		
			padding: 0 10px;
		}
	}
`
