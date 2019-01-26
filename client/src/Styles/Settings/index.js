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

	.inner {
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
		margin-bottom: 100px;

		@media (max-width: 950px) {
			margin-bottom: 0;
		}
	}

	.rollingPin {
		transform: rotateZ(45deg);
		position: absolute;
		width: 50%;
		top: -90px;
		left: 190px;
		z-index: 0;
	}
	.sidebarButton {
		position: absolute;
		top: 52px;
		left: 0px;
		background-color: ${props => props.theme.pink};
		border-color: ${props => props.theme.pink};

		&:enabled:hover {
			background-color: ${props => props.theme.darkPink};
			border-color: ${props => props.theme.darkPink};
		}
	}
	.p-sidebar {
		padding: 20px 14px;
	}
	.p-sidebar-left {
		top: 56px;
		width: 230px;
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

const MenuStyles = styled.div`
	font-size: 30px;
	border-bottom-color: ${props => props.theme.darkPink};
	z-index: 10;
	ul {
		border-bottom: 1px solid;
		border-bottom-color: ${props => props.theme.darkPink};
		display: flex;
		justify-content: center;
	}
`;

const ListItem = styled.li`
	background-color: ${props => props.theme.secondary};

	margin-bottom: 20px;

	transition: background-color 0.2s;
	list-style: none;
	float: left;

	padding: 0;
	white-space: nowrap;
	display: block;

	top: 1px;
	a {
		float: left;
		padding: 0.5em 1em;
		text-decoration: none;
		margin: 0 0.2em 1px 0px;
		cursor: pointer;
		border: 1px solid white;
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
		span {
			color: ${props => (props.isActive ? props.theme.text : props.theme.accentText)};
			font-family: "Merienda One", cursive;
			vertical-align: middle;
		}
	}

	&:hover {
		a {
			background-color: #dbdbdb;
			border: 1px solid #dbdbdb;
			span {
				color: ${props => props.theme.text};
			}
		}
	}
`;

export const NewMenu = ({ activeTab, setActiveTab }) => {
	return (
		<MenuStyles>
			<ul>
				<ListItem
					isActive={activeTab === 'quizzes'}
					onClick={() => setActiveTab('quizzes')}
				>
					<a>
						<span>Your Quizzes</span>
					</a>
				</ListItem>
				<ListItem isActive={activeTab === 'posts'} onClick={() => setActiveTab('posts')}>
					<a>
						<span>Your Posts</span>
					</a>
				</ListItem>
			</ul>
		</MenuStyles>
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
	z-index: 100;
	padding: 0 25px;
`;
