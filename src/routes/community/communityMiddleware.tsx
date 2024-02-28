// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Post from 'src/Screens/community/post';

const CommunityMiddleware = () => {
	return (
		<Routes>
			<Route path='post/:postid' element={<Post />} />
		</Routes>
	);
};

export default CommunityMiddleware;