import styled from 'styled-components';
import { AutoComplete } from 'primereact/autocomplete';

export const StyledAutoComplete = styled(AutoComplete)`
width: 50%;
  .p-inputtext {
    border: 1px solid #a6a6a6 !important;
	&:focus {
		border-color: ${props => props.theme.accentPink} !important;
	}
  }
  .p-button {
    height: 100% !important;
    background-color: ${props => props.theme.accentPink};
    border-color: ${props => props.theme.accentPink};
    &:enabled:hover {
			background-color: #ad546b;
			border: #ad546b;
		}
		&:enabled:focus {
			box-shadow: 0 0 0 0.2em #ad546b;
		}
  }
`;
