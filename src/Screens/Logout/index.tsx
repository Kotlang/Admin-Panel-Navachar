// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React from 'react';
import { useLoginStore } from 'src/store';

const Logout = () => {
	const logout = useLoginStore((state) => state.logout);
	return (
		<div>
			<h2 className='text-2xl font-bold'>Are you sure?</h2>
			<button onClick={logout} className='mt-5 flex items-center bg-red-500 text-white rounded-md px-8 py-1 text-lg font-semibold'>
                Yes
			</button>
		</div>
	);
};

export default Logout;