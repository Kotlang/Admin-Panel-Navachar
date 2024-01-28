// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { Layout } from 'antd';
import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';

const { Footer: AntdFooter } = Layout;

const Footer = ({ className }: { className?: string}) => {
	return (
		<AntdFooter className={classNames('bg-white flex flex-row items-center p-0 lg:h-[60px] shadow-top', className)}>
			<div className='hidden lg:block w-[200px]'></div>
			<section className='px-4 lg:px-8 flex-1 flex flex-col lg:items-center lg:flex-row lg:justify-between gap-x-2 py-4 gap-y-3'>
				Footer
			</section>
		</AntdFooter>
	);
};

export default styled(Footer)`
	background-color: white !important;
`;