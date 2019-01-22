import styled from 'styled-components';
import { AutoComplete } from 'primereact/autocomplete';

export const StyledAutoComplete = styled(AutoComplete)`
margin-bottom: 10px;
.p-component {
  font-family: 'Raleway', sans-serif;
}
  .p-inputtext {
    border-right: none;
	&:focus {
		border-color: ${props => props.theme.accentPink} !important;
	}
  }
  .p-button {
    height: 100% !important;
    background-color: ${props => props.theme.accentPink};
    border-color: ${props => props.theme.accentPink};
    &:enabled:hover {
			background-color:${props => props.theme.darkPink};
      border-color: ${props => props.theme.darkPink};
		}
		&:enabled:focus {
			box-shadow: 0 0 0 0.2em #ad546b;
		}
    &:enabled:active {
      background-color:${props => props.theme.darkPink};
      border-color: ${props => props.theme.darkPink};
    }
  }

`;
