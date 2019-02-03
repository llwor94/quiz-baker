import styled from 'styled-components';
import { Growl as ImportedGrowl } from 'primereact/growl';

export const Growl = styled(ImportedGrowl)`
  top: 50px;
.p-growl-topright {
		opacity: 1 !important;
    top: 50px;
}
  .p-growl-item-container.p-growl-message-info {
		background-color: ${props => props.theme.pink} !important;
		opacity: 1 !important;
		font-family: "Raleway", sans-serif !important;
		border-radius: 4px;
		color: white !important;
	}
	 .p-growl-item-container.p-growl-message-info .p-growl-image {
		display: none;
	}
	 .p-growl-item-container.p-growl-message-info .p-growl-icon-close {
		color: white !important;
	}
`;
