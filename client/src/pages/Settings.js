import React, { useState, createContext } from 'react';

import SettingsContainer from 'containers/Settings';

export const UserQuizzesCtx = createContext([ undefined, () => {} ]);
export const UserPostsCtx = createContext([ undefined, () => {} ]);

const Settings = props => {
	const [ userQuizzes, setUserQuizzes ] = useState(undefined);
	const [ userPosts, setUserPosts ] = useState(undefined);

	return (
		<UserQuizzesCtx.Provider value={[ userQuizzes, setUserQuizzes ]}>
			<UserPostsCtx.Provider value={[ userPosts, setUserPosts ]}>
				<SettingsContainer {...props} />
			</UserPostsCtx.Provider>
		</UserQuizzesCtx.Provider>
	);
};

export default Settings;
