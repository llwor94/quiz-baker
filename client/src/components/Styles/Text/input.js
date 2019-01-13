import styled from 'styled-components';
import { InputText } from 'primereact/inputtext';

export const StyledInput = styled(InputText)`
  
  border: 1px solid #a6a6a6 !important;
	&:focus {
		border-color: ${props => props.theme.accentPink} !important;
	}
`;
