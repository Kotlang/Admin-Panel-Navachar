// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import type { GetProp, TablePaginationConfig, TableProps } from 'antd';
import { Button, Popconfirm, Space, Table } from 'antd';
import { Metadata, RpcError } from 'grpc-web';
import React, { useEffect, useState } from 'react';
import clients from 'src/clients';
import {  ProfileListResponse, StatusResponse } from 'src/generated/common_pb';
import { IFetchDeletionRequests } from 'src/types';

import { formatUnixTimestamp,getFarmingType } from './utils';

const retentionDurationSeconds = 60 * 60 * 24 * 90; // 90 days

interface DataType {
  userName: string;
  phoneNo: string;
  requestDate: string;
  deadlineDate: string;
  farmingPractice: string;
  userId: string;
}

interface TableParams {
	pagination?: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
	filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
	totalPages?: number;
}

const DeletionUsersList: React.FC = () => {
	const [data, setData] = useState<DataType[]>();
	const [loading, setLoading] = useState<boolean>(true);
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 10
		},
		totalPages: 0
	});

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
			dataIndex: 'requestDate',
			key: 'requestDate',
			title: 'REQUEST DATE'
		},
		{
			dataIndex: 'deadlineDate',
			key: 'deadlineDate',
			title: 'DEADLINE DATE'
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
			render: (userId: string) => (
				<Space size="middle">
					<Popconfirm
						title="Cancel Profile Deletion"
						description="Are you sure you want to cancel Profile Deletion?"
						onConfirm={() => declineProfileDeletion(userId)}
						okText="Yes"
						cancelText="No"
					>
						<Button type='primary' danger>Decline</Button>
					</Popconfirm>
					<Popconfirm
						title="Delete Profile"
						description="Are you sure you want to delete this Profile?"
						onConfirm={() => acceptProfileDeletion(userId)}
						okText="Yes"
						cancelText="No"
					>
						<Button type= 'primary' >Accept</Button>
					</Popconfirm>
				</Space>
			),
			title: 'ACTIONS'
		}
	];

	const fetchProfiles = async (pageNumber: number, pageSize: number) => {
		try {
			const fetchDeletionRequests: IFetchDeletionRequests = {
				pageNumber,
				pageSize
			};
			const metaData: Metadata | null = null;

			clients.auth.loginVerified.GetPendingProfileDeletionRequests(fetchDeletionRequests, metaData, (err: RpcError, response: ProfileListResponse) => {
				if (err) {
					console.error('Error fetching profiles:', err);
				} else {
					setData(
						response.getProfilesList().map((profile) => {
							return {
								deadlineDate: formatUnixTimestamp((profile.getDeletioninfo()?.getDeletiontime() || 0) + retentionDurationSeconds),
								farmingPractice: getFarmingType(profile.getFarmingtype()),
								phoneNo: profile.getPhonenumber() || '',
								requestDate: formatUnixTimestamp(profile.getDeletioninfo()?.getDeletiontime() || 0),
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

	function declineProfileDeletion(userId: string) {
		const metaData: Metadata | null = null;

		clients.auth.loginVerified.CancelProfileDeletionRequest(userId, metaData, (err: RpcError, response: StatusResponse) => {
			if (err) {
				console.error('Error fetching profiles:', err);
			} else {
				const { current, pageSize } = tableParams.pagination || {};
				if (current) {
					fetchProfiles(current - 1, pageSize || 10);
				}
				console.debug('response', response);}
		}
		);

	}
	function acceptProfileDeletion(userId: string) {
		const metaData: Metadata | null = null;

		clients.auth.loginVerified.DeleteProfile(userId, metaData, (err: RpcError, response: StatusResponse) => {
			if (err) {
				console.error('Error Deleting profiles:', err);
			} else {
				const { current, pageSize } = tableParams.pagination || {};
				if (current) {
					fetchProfiles(current - 1, pageSize || 10);
				}
				console.debug('response', response);
			}
		}
		);
	}

	useEffect(() => {
		const { current, pageSize } = tableParams.pagination || {};
		if (current) {
			fetchProfiles(current - 1, pageSize || 10);
		}
	}, [JSON.stringify(tableParams)]);

	const handleTableChange: TableProps['onChange'] = (pagination) => {
		setTableParams({
			pagination: pagination
		// You can include other parameters if needed (sortField, sortOrder, filters)
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

export default DeletionUsersList;