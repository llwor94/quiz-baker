import styled from 'styled-components'

export const QuestionWrapper = styled.div`
  ${props => props.theme.fancyBorder};
  background-color: ${props => props.theme.secondary};
  margin-bottom: 10px;
  margin-top: 20px;
  padding: 5px;
  ${props => props.theme.flex('column')};
  margin-bottom: 200px;
  .no-questions {
    margin: 10px 0;
  }
`

export const Wrapper = styled.div`
  border-radius: 4px;
  border: 1px solid;
  border-color: ${props => props.theme.accent};
  padding: 40px;
  background-color: ${props => props.theme.secondary};
  margin-bottom: 10px;
  position: relative;
`

export const AnswerOption = styled.li`
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 5px;
  list-style-type: none;
  color: ${props => (props.correct ? 'white' : props.theme.text)};
  background-color: ${props => (props.correct ? props.theme.aqua : props.theme.secondary)};
  border: 1px solid ${props => (props.correct ? props.theme.aqua : props.theme.accent)};
  font-weight: ${props => props.correct && 'bold'};
`

export const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  cursor: pointer;
  color: gray;
  margin-bottom: 20px;
`

export const EditWrapper = styled(Wrapper)`
  position: relative;
  ${props => props.theme.flex('column', undefined, 'center')};
  box-shadow: none;
  .p-togglebutton.p-highlight {
    background-color: ${props => props.theme.aqua};
    border-color: ${props => props.theme.aqua};
    color: #ffffff;
    &:hover {
      background-color: ${props => props.theme.darkAqua};
      border-color: ${props => props.theme.darkAqua};
      color: #ffffff;
    }
  }
  .p-togglebutton:not(.p-disabled):not(.p-highlight) {
    background-color: ${props => props.theme.aqua};
    border-color: ${props => props.theme.aqua};
    color: #ffffff;
    &:hover {
      background-color: ${props => props.theme.darkAqua};
      border-color: ${props => props.theme.darkAqua};
      color: #ffffff;
    }
  }
`

export const InputTitleWrapper = styled.div`
  padding: 20px;
`
