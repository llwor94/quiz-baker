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
		border-color: ${props => props.theme.aqua} !important;
	}
  }
  .p-button {
    height: 100% !important;
    background-color: ${props => props.theme.aqua};
    border-color: ${props => props.theme.aqua};
    &:enabled:hover {
			background-color:${props => props.theme.darkAqua};
      border-color: ${props => props.theme.darkAqua};
		}
		&:enabled:focus {
			box-shadow: 0 0 0 0.2em #ad546b;
		}
    &:enabled:active {
      background-color:${props => props.theme.darkAqua};
      border-color: ${props => props.theme.darkAqua};
    }
  }
  

`;
