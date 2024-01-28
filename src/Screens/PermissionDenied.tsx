// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginStore } from 'src/store';

const PermissionDenied = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const navigate = useNavigate();
	const { setAuthResponse } = useLoginStore(({ setAuthResponse }) => ({ setAuthResponse }));

	return (
		<section className='min-h-screen min-w-screen flex flex-col items-center justify-center'>
			<h1 className='text-4xl font-bold'>Permission Denied</h1>
			<p className='mt-2 text-xl text-red-500'>Only <span className='font-bold text-2xl'>@admin</span> can access the Admin Portal</p>
			<Button
				htmlType="button"
				size="large"
				className="mt-5 w-36 rounded-md outline-none border-none bg-black text-white hover:text-white"
				onClick={() => {
					setAuthResponse({
						jwt: '',
						profile: {},
						userType: ''
					});
				}}
			>
				Try login again
			</Button>
		</section>
	);
};

export default PermissionDenied;