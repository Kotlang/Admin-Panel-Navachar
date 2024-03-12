// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import type { GetProp, TablePaginationConfig, TableProps } from 'antd';
import { Button, Popconfirm, Space, Table } from 'antd';
import { Metadata, RpcError } from 'grpc-web';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clients from 'src/clients';
import { ProfileListResponse } from 'src/generated/common_pb';
import { IFetchProfiles } from 'src/types';

import { blockUser, getFarmingType, getFarmingTypeColor, unBlockUser } from './utils';

interface DataType {
	userName: string;
	phoneNo: string;
	location: string;
	farmingPractice: string;
	lastActive: number;
	userId: string;
	isBlocked: boolean;
}

interface TableParams {
	pagination?: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
	filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const UsersList: React.FC = () => {
	const [data, setData] = useState<DataType[]>();
	const [loading, setLoading] = useState<boolean>(true);
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 10
		}
	});
	const navigate = useNavigate();

	function blockOrUnblockUser(userId: string | undefined, isBlocked: boolean | undefined) {
		if (userId === undefined || isBlocked === undefined) {
			return;
		}
		if (isBlocked) {
			unBlockUser(userId);
		} else {
			blockUser(userId);
		}
		// modify the isBlocked field in the data array
		const newData = data?.map((item) => {
			if (item.userId === userId) {
				item.isBlocked = !isBlocked;
			}
			return item;
		});
		setData(newData);
	}

	const columns: TableProps<DataType>['columns'] = [
		{
			dataIndex: 'userName',
			key: 'userName',
			title: 'USER NAME'
		},
		{
			dataIndex: 'phoneNo',
			key: 'phoneNo',
			title: 'PHONE NO.'
		},
		{
			dataIndex: 'location',
			key: 'location',
			title: 'LOCATION'
		},
		{
			dataIndex: 'farmingPractice',
			key: 'farmingPractice',
			render: (farmingPractice: string) => {
				return <span className={getFarmingTypeColor(farmingPractice)}>{farmingPractice}</span>;
			},
			title: 'FARMING PRACTICE'
		},
		{
			dataIndex: 'userId',
			key: 'userId',
			render: (userId: string, record: DataType) => (
				<Space size="middle">
					<Popconfirm
						title={record.isBlocked ? 'Unblock user' : 'Block user'}
						description={record.isBlocked ? 'Are you sure you want to unblock user?' : 'Are you sure you want to block user?'}
						onConfirm={() => blockOrUnblockUser(userId, record.isBlocked)}
						okText="Yes"
						cancelText="No"
					>
						<Button type='primary' danger>{record.isBlocked ? 'Unblock' : 'Block'}</Button>
					</Popconfirm>
					<Button type="primary" onClick={() => navigate(`userdetails/${userId}/${record.phoneNo}`)} >View</Button>
				</Space>
			),
			title: 'ACTIONS'
		}
	];

	const fetchProfiles = (pageNumber: number, pageSize: number) => {
		try {
			const fetchprofiles: IFetchProfiles = {
				filters: {},
				pageNumber: pageNumber,
				pageSize: pageSize
			};
			const metaData: Metadata | null = null;

			clients.auth.profile.FetchProfiles(fetchprofiles, metaData, (err: RpcError, response: ProfileListResponse) => {
				if (err) {
					console.error('Error fetching profiles:', err);
				} else {
					setData(
						response.getProfilesList().map((profile) => {
							return {
								farmingPractice: getFarmingType(profile.getFarmingtype()),
								isBlocked: profile.getIsblocked(),
								lastActive: 5,
								location: profile.getAddressesList()[0].getCity() || '',
								phoneNo: profile.getPhonenumber(),
								userId: profile.getUserid(),
								userName: profile.getName()
							};
						})
					);
					setTableParams({
						...tableParams,
						pagination: {
							...tableParams.pagination,
							total: response.getTotalusers()
						}
					});
				}
				setLoading(false);
			});
		} catch (err) {
			console.error('Error occurred:', err);
			setLoading(false);
		}
	};

	useEffect(() => {
		const { current, pageSize } = tableParams.pagination || {};
		if (current) {
			fetchProfiles(current - 1, pageSize || 10);
		}
	}, [JSON.stringify(tableParams)]);

	const handleTableChange: TableProps['onChange'] = (pagination) => {
		setTableParams({
			pagination: pagination
		});

		if (pagination.pageSize !== tableParams.pagination?.pageSize) {
			setData([]);
		}
	};
	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<Table
			columns={columns}
			rowKey={(record) => record.userId}
			dataSource={data}
			pagination={tableParams.pagination}
			loading={loading}
			onChange={handleTableChange}
		/>
	);
};

export default UsersList;