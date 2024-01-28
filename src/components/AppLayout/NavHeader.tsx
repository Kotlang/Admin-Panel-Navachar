// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { MenuOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import classNames from 'classnames';
import React, { FC } from 'react';
import styled from 'styled-components';

const { Header } = Layout;

interface Props {
	className?: string;
	sideDrawer: boolean;
	setSideDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavHeader: FC<Props> = ({ className, sideDrawer, setSideDrawer }) => {
	return (
		<Header
			className={classNames(
				'bg-purple_app_bg flex flex-row items-center p-0 h-[60px]',
				className
			)}
		>
			<section className='hidden lg:block w-[200px]'></section>
			<section className='px-4 lg:px-8 flex-1 flex items-center justify-between gap-x-2'>
				<article className='lg:hidden'>
					<Button
						icon={<MenuOutlined />}
						className='flex items-center justify-center outline-none border-none text-blue_primary shadow-none text-lg'
						onClick={() => {
							setSideDrawer(!sideDrawer);
						}}
					/>
				</article>
				<article className='hidden lg:block' />
			</section>
		</Header>
	);
};

export default styled(NavHeader)`
  background-color: ${(props) => props.theme.colors.purple_app_bg} !important;
`;
