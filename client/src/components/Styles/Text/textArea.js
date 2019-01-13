import styled from 'styled-components';

export const StyledTextArea = styled.textarea`
	outline: none;
	border-radius: 3px;
	border-color: ${props => props.theme.accentPink};
	resize: none;
	font-size: 14px;
	color: #333333;
	background: #ffffff;
	padding: 0.429em;
	border: 1px solid #a6a6a6;
	&:focus {
		border-color: ${props => props.theme.accentPink};
	}
`;
