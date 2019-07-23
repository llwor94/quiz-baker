import styled from 'styled-components'
import { AutoComplete } from 'primereact/autocomplete'

export const StyledAutoComplete = styled(AutoComplete)`
  margin-bottom: 10px;
  .p-component {
    font-family: 'Raleway', sans-serif;
  }
  .p-autocomplete-panel {
    ${props => props.theme.backgroundBorder(props.theme.secondary)};
  }
  .p-autocomplete-panel .p-autocomplete-items .p-autocomplete-list-item {
    color: ${props => props.theme.text};
  }
  .p-autocomplete-panel .p-autocomplete-items .p-autocomplete-list-item:hover {
    background-color: ${props => props.theme.aqua};
    color: white;
  }
  .p-inputtext {
    border-right: none;
    background-color: ${props => props.theme.secondary};
    border-color: ${props => props.theme.accent};
    color: ${props => props.theme.text};
    &:focus {
      border-color: ${props => props.theme.aqua} !important;
    }
    &::placeholder {
      font-family: 'Raleway', sans-serif;
      color: ${props => props.theme.placeholder};
      font-size: 14px;
    }
  }
  .p-button {
    height: 100% !important;
    ${props => props.theme.backgroundBorder(props.theme.aqua)};

    &:enabled:hover {
      ${props => props.theme.backgroundBorder(props.theme.darkAqua)};
    }
    &:enabled:focus {
      box-shadow: 0 0 0 0.2em #ad546b;
    }
    &:enabled:active {
      ${props => props.theme.backgroundBorder(props.theme.darkAqua)};
    }
  }
`
