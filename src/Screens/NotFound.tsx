// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React from 'react';

const NotFound = () => {
	return (
		<section
			className='flex w-full justify-center items-center'
		>
			<div className='flex flex-col gap-y-2'>
				<h1 className='text-2xl md:text-4xl'>Oops!</h1>
				<p className='text-lg md:text-xl text-red-500'>
					404 | This page could not be found
				</p>
			</div>
		</section>
	);
};

export default NotFound;