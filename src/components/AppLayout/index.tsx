/* eslint-disable */

// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { Drawer, Layout } from 'antd';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useLoginStore } from 'src/store';
import styled from 'styled-components';

import Menu from './Menu';
const { Content, Sider } = Layout;

interface IAppLayoutProps extends PropsWithChildren {
	className?: string;
}

const AppLayout: FC<IAppLayoutProps> = ({ className }) => {
	const [sideDrawer, setSideDrawer] = useState(false);

	const navigate = useNavigate();
	const { authResponse, isLogin } = useLoginStore(({ authResponse, isAdmin, isLogin }) => ({
		authResponse,
		isAdmin,
		isLogin
	}));

	useEffect(() => {
		console.log(authResponse);
		if (!isLogin()) {
			navigate('/login');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authResponse?.jwt]);

	return (
		<Layout className={className}>
			{/* <NavHeader setSideDrawer={setSideDrawer} sideDrawer={sideDrawer} /> */}
			<Layout hasSider className='relative'>
				<Sider
					trigger={null}
					collapsible={false}
					collapsed={false}
					className={'hidden overflow-y-hidden sidebar bg-main_black lg:block top-0 bottom-0 left-0 h-screen z-100 w-full max-w-[280px] sider-shadow'}
					style={{
						position: 'fixed'
					}}
				>
					<Menu className=' bg-main_black'/>
				</Sider>
				<Drawer
					placement='left'
					closable={false}
					onClose={() => setSideDrawer(false)}
					open={sideDrawer}
					getContainer={false}
					className='w-full max-w-[300px] p-5'
				>
					<Menu />
				</Drawer>
				<Layout className='min-h flex flex-row p-0'>
					<div className='hidden lg:block w-full max-w-[278px]'></div>
					<Content className='bg-mid_black  px-8'>
						<Outlet />
					</Content>
				</Layout>
			</Layout>
			{/* <Footer /> */}
		</Layout>
	);
};

export default styled(AppLayout)`
    background: white !important;
	.min-h {
		min-height: calc(100vh - 0px);
	}
	.sider-shadow {
		box-shadow: -2px 4px 4px rgba(63, 102, 153, 0.5);
	}
	.ant-drawer-content-wrapper {
		max-width: 200px;
	}
	.ant-drawer-mask {

	}
	.ant-layout-sider {
		background-color: #1E1E1E !important;
	}
	.ant-drawer-body {
		padding: 0;
		margin: 0;
	}
`;