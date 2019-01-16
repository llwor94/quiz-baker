import React, { useState, createContext } from 'react';

import PostsContainer from '../containers/Forum/Posts';

export const PostsCtx = createContext([ undefined, () => {} ]);

const ForumPage = props => {
	const [ posts, setPosts ] = useState(undefined);

	return (
		<PostsCtx.Provider value={[ posts, setPosts ]}>
			<PostsContainer {...props} />
		</PostsCtx.Provider>
	);
};

export default ForumPage;
