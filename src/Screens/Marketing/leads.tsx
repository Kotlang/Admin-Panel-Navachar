/* eslint-disable */

// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React, { useEffect } from "react";
import { useState } from "react";
import type { GetProp, TablePaginationConfig, TableProps } from "antd";
import { Table } from "antd";

interface DataType {
	userName: string;
	phoneNo: string;
	appStatus: String;
	type: string;
	lastMessage: string;
	consent: string;
	userId: string;
}

interface TableParams {
	pagination?: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
	filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

interface LeadsProps {
	search: string;
	filter: string;
}

const Leads: React.FC<LeadsProps> = ({ search, filter }) => {
	const [data, setData] = useState<DataType[]>();
	const [loading, setLoading] = useState<boolean>(false);
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 10,
		},
	});

	const sampleData: DataType[] = [
		{
			userName: "John Doe",
			phoneNo: "1234567890",
			appStatus: "I",
			type: "Farmer",
			lastMessage: "12/03/2024",
			consent: "Accepted",
			userId: "1",
		},
		{
			userName: "jane Cena",
			phoneNo: "1234567890",
			appStatus: "N",
			type: "Farmer",
			lastMessage: "14/03/2024",
			consent: "Decline",
			userId: "2",
		},
		{
			userName: "John Wick",
			phoneNo: "1234567890",
			appStatus: "N",
			type: "Farmer",
			lastMessage: "16/03/2024",
			consent: "NA",
			userId: "3",
		}
	];

	const columns: TableProps<DataType>["columns"] = [
		{
			dataIndex: "userName",
			key: "userName",
			title: "NAME",
		},
		{
			dataIndex: "phoneNo",
			key: "phoneNo",
			title: "PHONE NO.",
		},
		{
			dataIndex: "appStatus",
			key: "appStatus",
			render: (appStatus: string) => {
				return (
					<span
						className={`${appStatus === "I" ? "text-green-500" : ""}`}
					>
						{appStatus==="I" ? "Installed": "Not Installed"}
					</span>
				);
			},
			title: "APP STATUS",
		},
		{
			dataIndex: "type",
			key: "type",
			title: "TYPE",
		},
		{
			dataIndex: "lastMessage",
			key: "lastMessage",
			title: "LAST MESSAGE",
		},
		{
			dataIndex: "consent",
			key: "consent",
			render: (consent: string) => {
				return (
					<span className={`${consent === "Accepted" ? "text-green-500" : ""}`}>
						{consent}
					</span>
				);
			},
			title: "CONSENT",
		},
		{
			dataIndex: "userId",
			key: "userId",
			render: (userId: string) => {
				return (
					<div className="flex w-[50%]">
						<a href={`/userid/${userId}`}>
							<svg
								className="h-6 w-6 text-gray-300"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								{" "}
								<polyline points="9 18 15 12 9 6" />
							</svg>
						</a>
					</div>
				);
			},
		},
	];

	if (loading) {
		return <div>Loading...</div>;
	}

	const handleTableChange: TableProps["onChange"] = (pagination) => {
		setTableParams({
			pagination: pagination,
		});

		if (pagination.pageSize !== tableParams.pagination?.pageSize) {
			setData([]);
		}
	};

	useEffect(() => {
		setLoading(true);
		const filteredData = sampleData.filter(item => 
			item.userName.toLocaleLowerCase().includes(search.toLowerCase()) &&
			item.appStatus.includes(filter!=='A' && filter!=="" ? filter: item.appStatus.toString()));
		setData(filteredData);
		setLoading(false);
	}, [search, filter]);

	return (
		<div className="border border-gray-500 p-5">
			<Table
				columns={columns}
				rowKey={(record) => record.userId}
				dataSource={data}
				pagination={tableParams.pagination}
				loading={loading}
				onChange={handleTableChange}
			/>
		</div>
	);
};

export default Leads;
