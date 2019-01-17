import React, { useState, createContext } from 'react';

import PostContainer from '../containers/Post';
import CommentsContainer from '../containers/Post/Comments';

export const PostCtx = createContext([ undefined, () => {} ]);

const PostPage = props => {
	const [ post, setPost ] = useState(undefined);

	return (
		<PostCtx.Provider value={[ post, setPost ]}>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<PostContainer {...props} />
			</div>
		</PostCtx.Provider>
	);
};

export default PostPage;
