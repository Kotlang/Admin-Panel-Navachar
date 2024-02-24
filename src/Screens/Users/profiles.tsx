// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import type { GetProp, TablePaginationConfig, TableProps } from 'antd';
import { Button, Space, Table } from 'antd';
import { Metadata, RpcError } from 'grpc-web';
import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import clients from 'src/clients';
import { FarmingType } from 'src/generated/common_pb';
import { ProfileListResponse } from 'src/generated/profile_pb';
import { IFetchProfiles } from 'src/types';

interface DataType {
  userName: string;
  phoneNo: string;
  location: string;
  farmingPractice: string;
  lastActive: number;
  userId: string;
}

interface TableParams {
	pagination?: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
	filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const getFarmingType = (farmingType: FarmingType) => {
	switch (farmingType) {
	case FarmingType.CHEMICAL:
		return 'Chemical';
	case FarmingType.ORGANIC:
		return 'Organic';
	case FarmingType.MIX:
		return 'MIX';
	default:
		return 'Unknown';
	}
};

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

				let cls = '';
				if (farmingPractice === 'Chemical') {
					cls = 'text-purple-500';
				} else if (farmingPractice === 'Organic') {
					cls = 'text-green-500';
				} else if (farmingPractice === 'MIX') {
					cls = 'text-yellow-500';
				}else {
					cls = 'text-white';
				}
				return <span className={cls}>{farmingPractice}</span>;
			},
			title: 'FARMING PRACTICE'
		},
		{
			dataIndex: 'userId',
			key: 'userId',
			render: () => (
				<Space size="middle">
					<Button type='primary' danger>Block</Button>
					<Button type="primary" onClick={() => navigate('profile/${userId}')} >View</Button>
				</Space>
			),
			title: 'ACTIONS'
		}
	];

	const fetchProfiles =(pageNumber: number, pageSize: number) => {
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
								lastActive: 5,
								location: profile.getAddressesMap().get('default')?.getCity() || '',
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