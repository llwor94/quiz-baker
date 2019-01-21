import React from 'react';
import styled from 'styled-components';
import { TabMenu } from 'primereact/tabmenu';

export const SettingsWrapper = styled.div`
	display: flex;
	width: 100%;

	max-width: 900px;
	justify-content: flex-start;
	align-items: flex-start;
	margin: 70px 80px 0;
	h2 {
		text-align: center;
		text-transform: capitalize;
		font-family: "Merienda One", cursive;
		font-size: 40px;
		margin-right: 20px;
	}
`;

const StyledMenu = styled.div`
	.p-component {
		font-size: 30px;
	}
	.p-tabmenu .p-tabmenu-nav {
		border-bottom-color: ${props => props.theme.darkPink};
		display: flex;
		justify-content: space-around;
	}
	.p-tabmenu .p-tabmenu-nav .p-tabmenuitem {
		border: 1px solid white;
		background-color: white;
		margin-bottom: 20px;
	}

	.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link .p-menuitem-text {
		font-family: "Merienda One", cursive;
		color: ${props => props.theme.accentText};
	}
	.p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight {
		background-color: white;
		border: none;
	}
	.p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link .p-menuitem-text {
		color: black !important;
	}
`;

export const Menu = ({ model }) => {
	return (
		<StyledMenu>
			<TabMenu model={model} />
		</StyledMenu>
	);
};

export const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
`;

export const InnerWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-top: 10px;
`;
