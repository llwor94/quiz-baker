import styled from 'styled-components';

export const Wrapper = styled.div`
	padding: 12px;
	background-color: ${props => props.theme.secondary};
	position: relative;
	height: 200px;
	width: 450px;
	margin: 13px;
	${props => props.theme.flex('row', 'space-between')};
	${props => props.theme.fancyBorder};
	&:hover {
		border-color: ${props => props.theme.pink};
	}

	@media (max-width: 450px) {
		width: 100%;
	}
`;

export const HatWrapper = styled.img`
	position: absolute;
	top: -20px;
	left: -20px;
	transform: rotate(-45deg);
	background-color: ${props => props.theme.secondary};
	${props => props.theme.square(40)};
`;

export const LeftSide = styled.div`
	font-size: 20px;
	width: 40px;
	background-color: transparent;
	color: ${props => props.theme.text};
	margin: 0 10px 0 0;
	${props => props.theme.flex('column', 'center', 'center')};
	i {
		cursor: ${props => (props.user ? 'pointer' : 'default')};
		color: ${props => (props.user ? props.theme.text : props.theme.accent)};
	}
`;

export const InnerWrapper = styled.div`${props => props.theme.flex('column', 'space-between')};`;

export const Header = styled.div`
	font-weight: 400;
	margin-bottom: 8px;
	color: ${props => props.theme.link};
	${props => props.theme.flex('column', undefined, 'flex-start')};
	p {
		margin-top: 6px;
	}
	span {
		color: #873d48;
		font-weight: 700;
	}
`;

export const Title = styled.a`
	font-size: 24px;
	font-weight: 700;
	padding: 0 5px 0 0;
	margin-bottom: 5px;
	cursor: pointer;
	color: ${props => props.theme.text};
	&:hover {
		color: ${props => props.theme.darkPink};
	}
`;

const FooterAccent = styled.div`
	font-weight: 500;
	padding: 5px;
	border-radius: 5px;
`;

export const Topic = styled(FooterAccent)`
  font-size: 14px;
  color: white;
  background-color: ${props => props.theme.aqua};

  display: inline-block;
`;

export const Score = styled(FooterAccent)`
  font-size: 20px;
  padding: 0;
	color: ${props => props.theme.text};
  color: ${props => props.noScore && props.theme.accent};
  margin-bottom: 10px;
`;

export const DescriptionWrapper = styled.div`
	overflow: hidden;
	max-width: 300px;
	p {
		font-size: 14px;
		font-weight: 400;
		line-height: 21px;
		word-wrap: break-word;
		word-break: break-word;
	}
`;

export const UserNameWrapper = styled.div`
	font-weight: 400;
	color: ${props => props.theme.link};
	margin-right: 20px;
	${props => props.theme.flex(undefined, undefined, 'center')};
	a {
		padding-right: 4px;
		padding-left: 0px;
		font-weight: 700;
		margin-right: 4px;
		text-transform: capitalize;
		cursor: pointer;
		color: ${props => props.theme.accentText};
		&:hover {
			color: ${props => props.theme.aqua};
		}
	}
	i {
		color: ${props => props.theme.accentText};
		&:hover {
			color: ${props => props.theme.aqua};
		}
	}
	svg,
	i {
		cursor: pointer;
		font-size: 18px;
		padding-left: 4px;
	}
`;

export const User = styled.div`
	font-weight: 400;
	display: inline;
	color: ${props => props.theme.accentRed};
	padding-left: 3px;
`;

export const RightSide = styled.div`
	${props => props.theme.flex('column', 'space-between', 'flex-end')};
	height: 100%;
	font-size: 20px;
	svg {
		font-size: 30px;
	}
`;

export const FooterWrapper = styled.div`
	${props => props.theme.flex(undefined, undefined, 'flex-end')};
	font-weight: 700;
	.cookie {
		&:hover {
			color: #875818;
		}
	}
`;

export const QuestionCount = styled.div`
	${props => props.theme.flex()};
	border-radius: 4px;
	padding: 3px;
	color: ${props => props.theme.darkPink};
	.q {
		font-family: "Merienda One", cursive;
		padding: 4px 2px;
		font-size: 17px;
		color: ${props => props.theme.accentText};
	}
`;

export const MultiSelectWrapper = styled.div`
	.p-multiselect {
		height: 43px;
		${props => props.theme.flex(undefined, undefined, 'center')};
		background: ${props => props.theme.secondary};
		border-color: ${props => props.theme.accent};
		min-width: 120px;
	}
	.p-checkbox {
		display: none;
	}
	.p-inputtext:enabled:focus:not(.p-error) {
		border-color: ${props => props.theme.pink};
	}
	.p-multiselect-panel
		.p-multiselect-header
		.p-multiselect-filter-container
		.p-multiselect-filter-icon {
		color: ${props => props.theme.aqua};
	}
	.p-multiselect-panel .p-multiselect-items .p-multiselect-item.p-highlight {
		background-color: ${props => props.theme.pink};
	}
	.p-checkbox .p-checkbox-box.p-highlight {
		${props => props.theme.backgroundBorder(props.theme.aqua)};
	}
	.p-checkbox .p-checkbox-box.p-highlight:not(.p-disabled):hover {
		${props => props.theme.backgroundBorder(props.theme.darkAqua)};
	}

	.p-inputtext {
		background-color: ${props => props.theme.main};
		border-color: ${props => props.theme.accent};
		color: ${props => props.theme.text};
	}
	.p-inputtext:enabled:hover:not(.p-error) {
		border-color: ${props => props.theme.accent};
	}

	.p-multiselect .p-multiselect-trigger {
		background: ${props => props.theme.secondary};
		color: ${props => props.theme.accent};
	}
	.p-multiselect .p-multiselect-label {
		color: ${props => props.theme.text};
	}
	.p-multiselect:not(.p-disabled):hover {
		border-color: ${props => props.theme.accent};
	}
	.p-multiselect:not(.p-disabled):focus {
		border-color: ${props => props.theme.pink};
	}
	.p-multiselect:not(.p-disabled).p-focus {
		border-color: ${props => props.theme.pink};
	}
	.p-checkbox {
		display: none;
	}
	.p-inputtext:enabled:focus:not(.p-error) {
		border-color: ${props => props.theme.pink};
	}
	.p-multiselect-panel {
		${props => props.theme.backgroundBorder(props.theme.secondary)};
	}

	.p-multiselect-panel .p-multiselect-items .p-multiselect-item {
		color: ${props => props.theme.text};
	}
	.p-multiselect-panel .p-multiselect-header .p-multiselect-filter-container {
		width: 80%;
	}

	.p-multiselect-panel
		.p-multiselect-items
		.p-multiselect-item:not(.p-highlight):not(.p-disabled):hover {
		background-color: ${props => props.theme.main};
		color: ${props => props.theme.text};
	}

	.p-multiselect-panel .p-multiselect-header {
		${props => props.theme.backgroundBorder(props.theme.secondary)};
	}
	.p-multiselect-panel
		.p-multiselect-header
		.p-multiselect-filter-container
		.p-multiselect-filter-icon {
		color: ${props => props.theme.aqua};
	}
	.p-multiselect-panel .p-multiselect-items .p-multiselect-item.p-highlight {
		background-color: ${props => props.theme.pink};
	}
	.p-checkbox .p-checkbox-box {
		background-color: ${props => props.theme.secondary};
		border-color: ${props => props.theme.accent};
	}

	.p-checkbox .p-checkbox-box:not(.p-disabled):hover {
		border-color: ${props => props.theme.text};
	}

	.p-multiselect .p-multiselect-panel {
		min-width: initial;
	}

	.p-checkbox .p-checkbox-box.p-highlight {
		${props => props.theme.backgroundBorder(props.theme.aqua)};
	}
	.p-checkbox .p-checkbox-box.p-highlight:not(.p-disabled):hover {
		${props => props.theme.backgroundBorder(props.theme.darkAqua)};
	}
`;
