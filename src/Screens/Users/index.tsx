// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import { Typography } from 'antd';
import React from 'react';
import UsersList from 'src/Screens/Users/profiles';

const onChange = (key: string) => {
	console.log(key);
};

const { Title } = Typography;

const Users = () => {
	const items: TabsProps['items'] = [
		{
			children: 'Implement User Stats',
			key: '1',
			label: 'User Stats'
		},
		{
			children: <UsersList />,
			key: '2',
			label: 'Users List'
		},
		{
			children: 'Content of Tab Pane 3',
			key: '3',
			label: 'Delete Data Request'
		}
	];

	return<>
		<div className="mt-14">
			<Title >USERS</Title>
			<Tabs defaultActiveKey="1" items={items} onChange={onChange} size='large' />;
		</div>
	</>;
};

export default Users;