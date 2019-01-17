import React, { useEffect, useState, createContext } from 'react';

import SettingsContainer from '../containers/Settings';

export const UserQuizzesCtx = createContext([ undefined, () => {} ]);

const Settings = () => {
	const [ userQuizzes, setUserQuizzes ] = useState(undefined);

	return (
		<UserQuizzesCtx.Provider value={[ userQuizzes, setUserQuizzes ]}>
			<SettingsContainer />
		</UserQuizzesCtx.Provider>
	);
};

export default Settings;
