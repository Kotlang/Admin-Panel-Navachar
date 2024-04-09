/* eslint-disable */

// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React, { useEffect } from "react";
import { useState } from "react";
import { RpcError, Metadata } from "grpc-web";
import type {  TableProps } from "antd";
import { Button, Col, Divider, Modal, Row } from "antd";
import { ICreateLeads, IFetchLeads, TableParams } from "src/types";
import clients from "src/clients";
import { LeadListResponse } from "src/generated/lead_pb";
import { ExportLeadToExcel, FilterDuplicatesByKey, operatorTypeMapping } from "./utils";
import LeadsTable from "./components/LeadTable";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { CreateLead, GetLeadsFromExcelData } from "./writeData";

interface DataType {
	userName: string;
	phoneNo: string;
	appStatus: String;
	type: string;
	lastMessage: string;
	consent: string;
	userId: string;
}

interface LeadsProps {
	search: string;
	filter: string;
}

const Leads: React.FC<LeadsProps> = ({ search, filter }) => {
	const [data, setData] = useState<DataType[]>();
	const [loading, setLoading] = useState<boolean>(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [leadImportData, setLeadImportData] = useState<ICreateLeads[]>([]);
	const [modalLoading, setModalLoading] = useState<boolean>(false);
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 10,
		},
	});
	const [modalTableParams, setModalTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 8,
		},
	});

	const showModal = () => {
		console.log("Show Modal");
		
		setModalOpen(true);
	};

	const handleOk = async () => {
		setModalLoading(true);
		// Array to store all promises returned by CreateLead function
		const createLeadPromises: Promise<void>[] = leadImportData.map(async (lead: ICreateLeads) => {
			await CreateLead(lead);
		});

		// Wait for all CreateLead promises to resolve
		await Promise.all(createLeadPromises);
		setModalLoading(false);
		window.location.reload()
	};

	const handleCancel = () => {
		setLeadImportData([]);
		setModalOpen(false);
		window.location.reload()
	};

	// Handle table change event to update the table params
	const handleTableChange: TableProps["onChange"] = (pagination) => {
		setTableParams({
			pagination: pagination,
		});

		if (pagination.pageSize !== tableParams.pagination?.pageSize) {
			setData([]);
		}
	};

	// Handle table change event to update the table params
	const handleModalTableChange: TableProps["onChange"] = (pagination) => {
		setModalTableParams({
			pagination: pagination,
		});

		if (pagination.pageSize !== tableParams.pagination?.pageSize) {
			setData([]);
		}
	};

	// Fetch profiles from the server and set the data
	const fetchProfiles = (pageNumber: number, pageSize: number) => {
		try {
			const fetchprofiles: IFetchLeads = {
				PageNumber: pageNumber,
				pageSize: pageSize,
			};
			const metaData: Metadata | null = null;

			clients.auth.marketing.FeatchLeads(
				fetchprofiles,
				metaData,
				(err: RpcError, response: LeadListResponse) => {
					if (err) {
						console.error("Error fetching leads:", err);
					} else {
						setData(
							response.getLeadsList().map((lead) => {
								return {
									userName: lead.getName(),
									phoneNo: lead.getPhonenumber(),
									appStatus: "Not Installed",
									type: operatorTypeMapping(lead.getOperatortype()),
									lastMessage: "12/12/2024",
									consent: "Accepted",
									userId: lead.getLeadId(),
								};
							})
						);

						setTableParams({
							...tableParams,
							pagination: {
								...tableParams.pagination,
								total: response.getTotalleads(),
							},
						});
					}
				}
			);
			setLoading(false);
		} catch (err) {
			console.error("Error occurred:", err);
			setLoading(false);
		}
	};

	// Export all leads to excel
	function ExportAllLeads () {
		var total = tableParams.pagination?.total || 0;

		clients.auth.marketing.FeatchLeads(
			{
				pageSize: total,
				PageNumber: 0,
			},
			null,
			(err: RpcError, response: LeadListResponse) => {
				if (err) {
					console.error("Error fetching leads:", err);
				} else {
					ExportLeadToExcel(response.getLeadsList());
				}
			}
		);
	}

	// Handle Import of leads
	const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log("Import Leads");
		
		const { type, files } = e.target;
		if (type === "file") {
			if (files) {
				setLoading(true);
		
				// TODO: Use Single call to add all leads
				try {
					// Convert the raw file data into ICreateLeads array
					const leadsData: ICreateLeads[] = await GetLeadsFromExcelData(files[0]);
					setLeadImportData(FilterDuplicatesByKey(leadsData, 'phoneNumber'));
			
					showModal();
				} catch (error) {
					console.error("Error:", error);
				}
				setLoading(false);
			}
		}
	};
  

	useEffect(() => {
		const { current, pageSize } = tableParams.pagination || {};
		if (current) {
			fetchProfiles(current - 1, pageSize || 14);
		}
	}, [JSON.stringify(tableParams)]);

	return (
		<div className="border border-gray-500 p-5">
			{loading && (
				<div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
				</div>
			)}
			<Row>
				<Col span={20} >
					<Row justify='center' >
						<h1 className="text-2xl font-semibold">Leads</h1>
					</Row>
				</Col>
				<Col span={4}>
					<Row justify="end">
						<label htmlFor="file-upload">
							<UploadOutlined style={{ fontSize : '1.5rem'}}/>	
						</label>
						<input
							type="file"
							id="file-upload"
							style={{ display: "none" }}
							onChange={handleImport}
							accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
						/>
						<button className="mx-5" onClick={ExportAllLeads}>
							<DownloadOutlined style={{ fontSize : '1.5rem'}}/>
						</button>
						<p className="text-lg mx-1">Files</p>\
					</Row>
				</Col>
			</Row>
			<Divider />
			<LeadsTable 
				data={data}
				loading={loading}
				pagination={tableParams.pagination}
				columnsToDisplay={[ 'userName', 'phoneNo', 'appStatus', 'type', 'lastMessage', 'consent', 'userId' ]}
				onChange={handleTableChange}
			/>
			<Modal
				open={modalOpen}
				title="Update Lead"
				onOk={handleOk}
				onCancel={handleCancel}
				width={"70%"}
				footer={[
					<Button key="back" type="primary" danger onClick={handleCancel}>
            Cancel
					</Button>,
					<Button key="submit" type="primary" loading={modalLoading} onClick={handleOk}>
            Confirm
					</Button>
				]}
			>
				<LeadsTable 
				data={
					leadImportData.map((lead) => {
						return {
							userName: lead.name,
							phoneNo: lead.phoneNumber,
							appStatus: "Not Installed",
							type: "NA",
							lastMessage: "Not Implemented"
						};
					})
				}
				loading={modalLoading}
				pagination={modalTableParams.pagination}
				columnsToDisplay={[ 'userName', 'phoneNo', 'appStatus', 'type', 'lastMessage' ]}
				onChange={handleModalTableChange}
				/>
			</Modal>
		</div>
		
	);
};

export default Leads;
