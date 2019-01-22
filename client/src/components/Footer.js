import React, { useEffect, useState, createContext } from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.div`
	width: 100%;

	border-top: 1px solid lightgray;
	padding: 10px;
	font-size: 12px;
	max-height: 50px;
	height: 50px;
	a {
		color: ${props => props.theme.pink};
		&:hover {
			color: ${props => props.theme.aqua};
		}
	}
`;

const Footer = () => {
	return (
		<FooterWrapper>
			Created with love by{' '}
			<a href='https://github.com/cooltable' target='_blank' rel='noopener noreferrer'>
				Cool Table
			</a>
		</FooterWrapper>
	);
};

export default Footer;
