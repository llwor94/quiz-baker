import React from 'react';
import styled from 'styled-components';

export const SettingsWrapper = styled.div`
	${props => props.theme.flex(undefined, 'flex-start', 'flex-start')} width: 100%;
	max-width: 900px;
	margin: 70px 80px 0;
	h2 {
		text-align: center;
		text-transform: capitalize;
		font-family: "Merienda One", cursive;
		font-size: 40px;
		margin-right: 20px;
	}

	.inner {
		${props => props.theme.flex('column', 'center')};
		position: relative;
		margin-bottom: 100px;

		@media (max-width: 950px) {
			margin-bottom: 0;
		}
		svg {
			transform: rotateZ(45deg);
			position: absolute;
			width: 50%;
			top: -90px;
			left: 190px;
			z-index: 0;
			fill: ${props => props.theme.placeholder};
		}
	}

	.sidebarButton {
		position: absolute;
		top: 52px;
		left: 0px;
		${props => props.theme.backgroundBorder(props.theme.pink)};

		&:enabled:hover {
			${props => props.theme.backgroundBorder(props.theme.darkPink)};
		}
	}
	.p-sidebar {
		padding: 20px 14px;
		${props => props.theme.backgroundBorder(props.theme.secondary)};
	}
	.p-sidebar-left {
		top: 55px;
		width: 230px;
	}
`;

const MenuStyles = styled.div`
	font-size: 30px;
	border-bottom-color: ${props => props.theme.darkPink};
	z-index: 10;
	ul {
		border-bottom: 1px solid;
		border-bottom-color: ${props => props.theme.darkPink};
		${props => props.theme.flex(undefined, 'center')};
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
		border: 1px solid ${props => props.theme.accent};
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
			border: 1px solid;
			${props => props.theme.backgroundBorder(props.theme.accent)};
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
					<a href='#quizzes'>
						<span>Your Quizzes</span>
					</a>
				</ListItem>
				<ListItem isActive={activeTab === 'posts'} onClick={() => setActiveTab('posts')}>
					<a href='#posts'>
						<span>Your Posts</span>
					</a>
				</ListItem>
			</ul>
		</MenuStyles>
	);
};

export const Wrapper = styled.div`
	${props => props.theme.flex(undefined, 'space-evenly')} flex-wrap: wrap;
	margin-top: 30px;
`;

export const InnerWrapper = styled.div`
	${props => props.theme.flex('column', undefined, 'center')} margin-top: 10px;
	z-index: 100;
	padding: 0 25px;
`;
