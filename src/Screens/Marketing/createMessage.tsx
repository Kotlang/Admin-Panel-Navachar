// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
/* eslint-disable no-mixed-spaces-and-tabs */
import { LeftOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Divider, Flex, message ,Row, Spin, Table, TableProps, Typography, Upload, UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import { readAndCompressImage } from 'browser-image-resizer';
import { Metadata, RpcError } from 'grpc-web';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import clients from 'src/clients';
import { LeadFilters, LeadListResponse, LeadProto } from 'src/generated/lead_pb';
import {
	MediaParameters,
	MediaType,
	MediaUploadRequest,
	MediaUploadUrl,
	MessagingTemplate,
	ScheduleInfo
} from 'src/generated/messaging-service_pb';
import { MesssageRequest } from 'src/generated/messaging-service_pb';
import { IFetchLeads, IFetchTemplateRequest, IMessagePreview, TableParams } from 'src/types';
import { ICreateLeads } from 'src/types';
import * as XLSX from 'xlsx';

import MessageComponent from './components/messagePreview';
import { AddCountryCode, RemoveCountryCode } from './utils';

function getPresignedUrl(extension: string): Promise<MediaUploadUrl> {
	return new Promise((resolve, reject) => {
		const mediaUploadRequest = new MediaUploadRequest();
		mediaUploadRequest.setMediaextension(extension);

		clients.messaging.messaging.GetMessageMediaUploadurl(
			mediaUploadRequest,
			{},
			(err, response) => {
				if (err) {
					console.error(err);
					reject(err);
				} else {
					resolve(response);
				}
			});
	});
}

// Fetch template details
function fetchTemlateDetails( templateId: string ): Promise<MessagingTemplate> {
	return new Promise((resolve, reject) => {
		const fetchTemplateRequest: IFetchTemplateRequest = {
			templateId: templateId
		};

		clients.messaging.messaging.FetchTemplates(
			fetchTemplateRequest,
			{},
			(err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res.getTemplatesList()[0]);
				}
			}
		);
	});
}

interface tableData {
	userName: string;
	phoneNo: string;
}

const CreateMessage = () => {
	const navigate = useNavigate();
	const [isImporting, setIsImporting] = useState(false);
	const [template, setTemplate] = useState<MessagingTemplate>();
	const [whatsappMessage, setMessage] = useState<IMessagePreview>();
	const [recepientPhoneNumber, setRecepientPhoneNumber] = useState<string[]>([]);
	const [unRegisteredRecepients, setUnRegisteredRecepients] = useState<string[]>([]);
	const [scheduling, setScheduling] = useState(false);
	const [scheduleTime, setScheduleTime] = useState(0);
	const [isUploadingFile, setIsUploadingFile] = useState(false);
	const [recepients, setRecepients] = useState<LeadProto[]>([]);
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 5
		}
	});

	const handleSelectTemplate = () => {
		navigate('/marketing/messaging/templateselection');
	};

	const { templateId } = useParams();

	// Send the message
	async function broadCastMessage() {

		if (templateId && recepients.length > 0 && template) {

			const messageRequest = new MesssageRequest();
			messageRequest.setTemplateid(template.getTemplateid());

			// Add country code to the phone numbers and set the recepients
			const recepientsPhone = AddCountryCode(recepients.map((lead) => lead.getPhonenumber()));
			messageRequest.setRecipientphonenumberList(recepientsPhone);

			// Set the header and body parameters
			whatsappMessage?.headerParameters.forEach(([key, value]) => {
				messageRequest.getHeaderparametersMap().set(key, value);
			});
			whatsappMessage?.bodyParameters.forEach(([key, value]) => {
				messageRequest.getBodyparametersMap().set(key, value);
			});
			messageRequest.setWabaid(template.getWabaid());

			if (whatsappMessage?.mediaParameters) {
				const mediaParameters = new MediaParameters();
				mediaParameters.setFilename(whatsappMessage.mediaParameters.filename);
				mediaParameters.setLink(whatsappMessage.mediaParameters.link);
				mediaParameters.setMediatype(whatsappMessage.mediaParameters.mediaType);
				messageRequest.setMediaparameters(mediaParameters);
			}
			// messageRequest.setPreview(prevMessage)
			const metaData = null;
			if (scheduling) {
				const scheduleInfoRequest = new ScheduleInfo();
				scheduleInfoRequest.setIsscheduled(true);
				scheduleInfoRequest.setScheduledtime(scheduleTime);
				messageRequest.setScheduleinfo(scheduleInfoRequest);
			}

			clients.messaging.messaging.BroadCastMessage(
				messageRequest,
				metaData,
				(err, res) => {
					if (err) {
						console.error('Error While Sending Message', err);
					} else {
						console.debug('Message Sent', res.getStatus);
					}
				}
			);
		}
	}

	// Table columns for leads
	const allColumns: TableProps<tableData>['columns'] = [
		{
			dataIndex: 'userName',
			key: 'userName',
			title: 'NAME'
		},
		{
			dataIndex: 'phoneNo',
			key: 'phoneNo',
			title: 'PHONE NO.'
		},
		{
			dataIndex: 'removeLead',
			key: 'removeLead',
			render: (text: string, record: tableData) => {
				return (
					<Button
						type='primary'
						danger
						onClick={() => {
							const newLeads = recepients.filter((lead) => lead.getPhonenumber() !== record.phoneNo);
							setRecepients(newLeads);
						}}
					>
					Remove
					</Button>
				);
			}
		}
	];

	// Handle Importing of Leads from Excel
	const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const { type, files } = e.target;

		if (type !== 'file') {
			console.error('Lead upload file should be of type file');
			return;
		}

		if (!files || !files[0]) {
			return;
		}

		setIsImporting(true);
		try {
			const ab = await files[0].arrayBuffer();
			const wb = XLSX.read(ab);
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			const rows: ICreateLeads[] = XLSX.utils.sheet_to_json<ICreateLeads>(
				ws,
				{ header: 1 }
			);

			const phoneNumbers: string[] = [];

			rows.slice(1).forEach(async (colName: any) => {
				// Check if the row is empty (all columns are empty)
				if (colName.every((cell: any) => !cell)) {
					return; // Ignore this row
				}

				// Assuming each row has at least two columns
				if (!colName[0]) {
					console.warn('Ignoring incomplete row:', colName);
					return; // Ignore this row
				}

				try{
					phoneNumbers.push(colName[0].toString());
				} catch (err) {
					console.error('Error While Extracting Data', err);
				}
				setRecepientPhoneNumber(phoneNumbers);
			});
		} catch (err) {
			console.error('Error While Extracting Data', err);
		}

		setIsImporting(false);
	};

	// Fetch profiles from the server and set the data
	const fetchProfiles = (pageNumber: number, pageSize: number, recepientsPhoneNum: string[]) => {
		try {

			const filters = new LeadFilters();
			filters.setPhonenumbersList(recepientsPhoneNum);
			const fetchprofiles: IFetchLeads = {
				PageNumber: pageNumber,
				pageSize: pageSize
			};
			fetchprofiles.leadfilters = filters;

			const metaData: Metadata | null = null;

			clients.auth.marketing.FeatchLeads(
				fetchprofiles,
				metaData,
				(err: RpcError, response: LeadListResponse) => {
					if (err) {
						console.error('Error fetching leads:', err);
					} else {
						setRecepients(response.getLeadsList());

						// set Unregistered users
						const unregisteredUsers = recepientsPhoneNum.filter((phone) => !response.getLeadsList().find((lead) => lead.getPhonenumber() === phone));
						setUnRegisteredRecepients(unregisteredUsers);
					}
				}
			);
		} catch (err) {
			console.error('Error occurred:', err);
		}
	};

	// Handles the submit button
	const handleSubmit = async () => {
		await broadCastMessage();
		navigate('/marketing/createmessage');
		window.location.reload();
	};

	// Handle scheduling of message
	const handleDateChange = (date: any) => {
		if (date && date.isAfter(moment())) {
			setScheduleTime(date.unix());
		} else {
			alert('You cannot schedule a time in the past.');
		}
	};

	// Compress and upload image to a presigned url
	async function compressAndUpload(file: RcFile) {
		// compress image
		let compressedFile;
		if (file.type === 'image/jpeg' || file.type === 'image/png') {
			compressedFile = await readAndCompressImage(file, {
				maxHeight: 600,
				maxWidth: 800,
				quality: 0.5
			});
		}

		const preSignedUrl = await  getPresignedUrl(file.type.split('/')[1]);

		if (!preSignedUrl) {
			message.error('Failed to get presigned url');
			return false;
		}

		const response = await fetch(preSignedUrl.getUploadurl(), {
			method: 'PUT',
			// eslint-disable-next-line sort-keys
			body: compressedFile ? compressedFile : file,
			headers: {
				'Content-Type': file.type
			}
		});

		if (!response.ok) {
			message.error('Failed to upload media');
			return false;
		}

		if (!whatsappMessage) {
			message.error('Failed to get whatsapp message');
			return false;
		}

		// update media info in whatsappMessage
		const newMessage = { ...whatsappMessage };
		newMessage.mediaParameters.filename = file.name;
		newMessage.mediaParameters.link = preSignedUrl.getMediaurl();
		setMessage(newMessage);

		return false;
	}

	// Media upload related functions
	const props: UploadProps = {
		beforeUpload: async (file) => {

			setIsUploadingFile(true);
			if (whatsappMessage?.mediaParameters?.mediaType === MediaType.IMAGE) {
				if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
					message.error(`${file.name} is not a png file`);
					return false;
				}
			} else if (whatsappMessage?.mediaParameters?.mediaType === MediaType.VIDEO) {
				if (file.type !== 'video/mp4') {
					message.error(`${file.name} is not a mp4 file`);
					return false;
				}
			} else if (whatsappMessage?.mediaParameters?.mediaType === MediaType.DOCUMENT) {
				if (file.type !== 'application/pdf') {
					message.error(`${file.name} is not a pdf file`);
					return false;
				}
			} else {
				message.error('Invalid media type');
				return false;
			}

			await compressAndUpload(file);
			setIsUploadingFile(false);

			return false;
		},
		maxCount : 1,
		onRemove:  () => {
			// set file to null
			const wpmessage = { ...whatsappMessage };
			wpmessage.mediaParameters = {
				filename: template?.getMediaparameters()?.getFilename() || '',
				link: template?.getMediaparameters()?.getLink() || '',
				mediaType: template?.getMediaparameters()?.getMediatype() || MediaType.IMAGE
			};
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			if (templateId) {
				const fetchedTemplate = await fetchTemlateDetails(templateId);
				setTemplate(fetchedTemplate);
			}
		};
		fetchData();
	}, [templateId]);

	useEffect(() => {
		if (template) {
			const whatsappMessage: IMessagePreview = {
				Buttons: {
					callToActionButtons: template.getButtons()?.getCalltoactionbuttonsList() || [],
					quickReplyButtons: template.getButtons()?.getQuickreplybuttonsList() || []
				},
				body: template.getBody(),
				bodyParameters: template.getBodyparametersMap().arr_,
				footer: template.getFooter(),
				header: template.getHeader(),
				headerParameters: template.getHeaderparametersMap().arr_,
				mediaParameters: {
					filename: template.getMediaparameters()?.getFilename() || '',
					link: template.getMediaparameters()?.getLink() || '',
					mediaType: template.getMediaparameters()?.getMediatype() || MediaType.IMAGE

				}
			};
			setMessage(whatsappMessage);
		}
	}, [template]);

	useEffect(() => {
		if (recepientPhoneNumber && recepientPhoneNumber.length > 0) {
			fetchProfiles(0, recepientPhoneNumber.length, RemoveCountryCode(recepientPhoneNumber));
		}
	}, [recepientPhoneNumber]);

	return (
		<>
			{isImporting && (
				<div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
				</div>
			)}

			<Row style={{ marginBottom : '20px', marginTop : '80px' }}>
				<Col span={24}>
					<Flex>
						<a href="/marketing/campaigns">
							<LeftOutlined style={{ color: '#34C06E', fontSize: '30px' }} />
						</a>
						<h2 className="flex w-full justify-center font-barlow font-regular text-2xl leading-7 tracking-[10px]">
                            Create Message
						</h2>
					</Flex>
				</Col>
			</Row>

			<Row style={{
				backgroundColor: 'rgb(24 24 27)',
				border: '1px solid #d9d9d9',
				borderRadius: '4px',
				padding: '16px' }}>

				{/* Template selection and leads upload button */}
				<Col span={24}>
					<Flex justify="space-between" align="center">
						<Flex align="center">
							<Button  type = "text" size="large" onClick={handleSelectTemplate} style={{ alignItems: 'center', display: 'flex' }}>
                                Select Template
								<PlusOutlined style={{ color: '#34C06E', fontSize: '20px' }}/>
							</Button>
							{template && (
								<p className=" text-lg">{template.getTemplatename()}</p>
							)}
						</Flex>
						<label
							htmlFor="file-upload"
							className="flex flex-row items-center gap-x-2"
						>
							<UploadOutlined style={{ fontSize : '1.5rem' }}/>
							<p className=" text-lg">Select Leads</p>
						</label>
						<input
							type="file"
							id="file-upload"
							onChange={handleImport}
							style={{ display: 'none' }}
							accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
						/>
					</Flex>
				</Col>

				<Divider />
				<Col span={15}>
					{/* Paramater UI elements */}
					<Flex style={{ flexDirection : 'column' }}>

						<Typography.Text style={{ fontSize : '1.25rem', marginBottom : '10px' }}>Header Params: </Typography.Text>
						{
							whatsappMessage?.bodyParameters.map(
								([key, value]: [string, string], index: number) => (
									<div
										key={index}
										className="flex flex-row items-center mb-2"
									>
										<p className=" text-lg mr-2">{key}</p>
										<input
											className="w-[50%] p-1 bg-transparent border"
											type="text"
											value={value}
											onChange={(e) => {
												const updatedBodyVar = [...whatsappMessage.bodyParameters];
												updatedBodyVar[index][1] = e.target.value;
												setMessage({ ...whatsappMessage, bodyParameters: updatedBodyVar });
											}}
										/>
									</div>
								)
							)
						}

						<Typography.Text style={{ fontSize : '1.25rem', marginBottom : '10px' }}>Body Params: </Typography.Text>
						{
							whatsappMessage?.headerParameters &&
                                whatsappMessage?.headerParameters.map(
                                	([key, value]: [string, string], index: number) => (
                                		<div
                                			key={index}
                                			className="flex flex-row items-center mb-2"
                                		>
                                			<p className=" text-lg mr-2">{key}</p>
                                			<input
                                				className="w-[50%] p-1 bg-transparent border"
                                				type="text"
                                				value={value}
                                				onChange={(e) => {
                                					const updatedHeaderVar = [...whatsappMessage.headerParameters];
                                					updatedHeaderVar[index][1] = e.target.value;
                                					setMessage({ ...whatsappMessage, headerParameters: updatedHeaderVar });
                                				}}
                                			/>
                                		</div>
                                    	)
                                )
						}
						{
							whatsappMessage?.mediaParameters.link && (
								<Flex>
									<p className=" text-lg mr-2">{getMediaTypeString(whatsappMessage?.mediaParameters?.mediaType)} Link:</p>
									<Upload {...props}>
										<Button icon={isUploadingFile ? <Spin />  : <UploadOutlined />}>{isUploadingFile ? 'Uploading' : 'Upload'}</Button>
									</Upload>
								</Flex>
							)
						}
					</Flex>

					{/* Scheduling info UI elements */}
					<div className="mt-4 px-4">
						<div className="">
							<input
								className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
								type="checkbox"
								role="switch"
								checked={scheduling}
								onChange={() => setScheduling(!scheduling)}
								id="flexSwitchCheckDefault"
							/>
							<label
								className="inline-block pl-[0.15rem] hover:cursor-pointer"
								htmlFor="flexSwitchCheckDefault"
							>
                                    Scheduling
							</label>
						</div>

						{scheduling && (
							<DatePicker
								className="mt-4 border-white"
								format="DD/MM/YYYY hh:mm A"
								onChange={handleDateChange}
								showTime={{ use12Hours: true }}
								disabledDate={(current) => {
									return current && current < moment().startOf('day');
								}}
							/>
						)}
					</div>

					{/* Submit button  */}
					<div className="flex mt-2 px-4 py-2">
						<button
							className="p-2 bg-green-700 font-bold rounded-lg "
							onClick={handleSubmit}
						>
                                Launch Message
						</button>
					</div>
					<Divider plain />
					<Col xs={24} sm={24} md={24} lg={20}>
						<Table
							columns={allColumns}
							rowKey={(record) => record.phoneNo}
							dataSource={recepients.map((lead) => ({
								phoneNo: lead.getPhonenumber(),
								userName: lead.getName()
							}))
							}
							pagination={tableParams.pagination}
							onChange={(Pagination) => {
								setTableParams({ pagination: Pagination });
							}
							}
						/>
					</Col>
					<Divider />
					<Col xs={24} sm={24} md={24} lg={20}>
						<Flex wrap='wrap' style={{ border : '1px solid rgba(255, 255, 255, 0.5)', flexDirection : 'column', padding : '10px' }}>
							<Typography.Text style={{ fontSize : '1.2rem' }}>
								UnRegistered Recepients
							</Typography.Text>
							{
								unRegisteredRecepients.map((phone) => (
									<p key={phone} className="text-lg">{phone}</p>
								))
							}
						</Flex>
					</Col>
				</Col>

				{/* Preview of message */}
				<Col span={9}>
					< MessageComponent message={whatsappMessage}/>
				</Col>
			</Row>
		</>
	);
};

// Get media type string
function getMediaTypeString(mediaType: number) {

	switch (mediaType) {
	case 0:
		return 'Image';
	case 1:
		return 'Document';
	case 2:
		return 'Video';
	default:
		return 'Image';
	}
}

export default CreateMessage;
