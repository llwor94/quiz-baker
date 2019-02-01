import React from 'react';
import styled from 'styled-components';
import { RadioButton as StyledRadioButton } from 'primereact/radiobutton';

const StyledRadio = styled(StyledRadioButton)`
.p-radiobutton .p-radiobutton-box .p-highlight {
  background-color: ${props => props.theme.pink} !important;
  border: ${props => props.theme.pink} !important;
  &:hover {
    background-color: ${props => props.theme.darkPink} !important;
  border: ${props => props.theme.darkPink} !important;
  }
}
`;

const RadioButton = ({ id, value, onChange, checked }) => (
	<StyledRadio inputId={id} value={value} onChange={onChange} checked={checked} />
);

export default RadioButton;
