import React from 'react';
import Sidebar from './sidebar';
import styled from 'styled-components';

import QuizzesContainer from './UserQuizzes/Quizzes';

const SettingsWrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
`;

const Settings = ({ ...props }) => {
	return (
		<SettingsWrapper>
			<Sidebar />
			<QuizzesContainer {...props} />
		</SettingsWrapper>
	);
};

export default Settings;
