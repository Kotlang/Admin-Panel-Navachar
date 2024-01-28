/* eslint-disable */

// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
	Button,
	DatePicker,
	Form,
	Input,
	InputNumber,
	InputRef,
	Modal,
	Radio,
	Space,
	Tag,
	Tooltip
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Metadata, RpcError } from 'grpc-web';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { WebPreview } from 'src/generated/commons_pb'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import clients from 'src/clients';
import { EventProto, EventType } from 'src/generated/events_pb';
import { IEvent, MediaUrl } from 'src/types';
import EventPreview from './preview';
import { useLoginStore } from 'src/store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { RangePicker } = DatePicker;

const Events = () => {
	const [tags, setTags] = useState<string[]>([]);
	const [mediaurls, setMediaurls] = useState<MediaUrl[]>([]);
	const [webpreviews, setWebPreview] = useState<Array<WebPreview.AsObject>>([]);
	const [inputVisible, setInputVisible] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [editInputIndex, setEditInputIndex] = useState(-1);
	const [editInputValue, setEditInputValue] = useState('');
	const inputRef = useRef<InputRef>(null);
	const editInputRef = useRef<InputRef>(null);
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();
	const [formdata, setFormData] = useState<IEvent>();
	const { eventId } = useParams();
	const isEditMode = eventId != null;
	const navigate = useNavigate();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [files, setFiles] = useState<File[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isUploading, setIsUploading] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		uploadFiles();
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const triggerFileInput = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setFiles([...files, ...Array.from(event.target.files)]);
		}
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		if (event.dataTransfer.files) {
			setFiles([...files, ...Array.from(event.dataTransfer.files)]);
		}
	};

	const handleRemoveFile = (index: number) => {
		setFiles(files.filter((_, fileIndex) => fileIndex !== index));
	};

	const fetchCoordinates = async (address: string) => {
		try {
			const googleMapApi = process.env.REACT_APP_GOOGLE_MAP_URL
			if(!googleMapApi){
				throw new Error("google api url is not defined");

			}
			const response = await axios.get(googleMapApi, {
				params: {
					address: address,
					key: process.env.REACT_APP_GOOGLE_API_KEY
				}
			});
			console.log(response.data)
			return response.data.results[0].geometry.location;
		} catch (error) {
			console.error('Error fetching coordinates:', error);
			return null;
		}
	};

	async function uploadFiles() {
		setIsUploading(true);
		let updatedMediaUrls = [...mediaurls];
		for (let i = 0; i < files.length; i++) {
			const formData = new FormData();
			formData.append('myFile', files[i]);

			try {
				const jwt = useLoginStore.getState().authResponse.jwt;
				const mediaUploadApiKey = process.env.REACT_APP_MEDIA_UPLOAD_URL;
				if (!mediaUploadApiKey) {
					throw new Error("MEDIA_UPLOAD_URL is not defined");
				}
	
				const response = await axios.post(mediaUploadApiKey, formData, {
					headers: {
						'Authorization': `Bearer ${jwt}`,
						'Content-Type': 'multipart/form-data'
					}
				});
				console.log(response)
				if (response.data && response.data.url) {
					updatedMediaUrls.push({
						url: response.data?.url,
						mimeType: response.data?.mimetype
					});
				}

			} catch (error) {
				console.error('Upload error:', error);
			}
		}
		setMediaurls(updatedMediaUrls);
		setIsUploading(false);
	}

	const fetchEventById = (eventId: string, metaData: Metadata | null): Promise<EventProto> => {
		return new Promise((resolve, reject) => {
			clients.social.event.GetEvent(eventId, metaData, (err: RpcError, response: EventProto) => {
				if (err) {
					reject(err);
				} else {
					resolve(response);
				}
			});
		});
	};

	useEffect(() => {
		const fetchData = async () => {
			if (isEditMode) {
				try {
					setLoading(true);
					const eventData = await fetchEventById(eventId, {});
					console.log(eventData);
					const fetchedWebPreviews = eventData.getWebpreviewsList() || [];
					// const tag = eventData.getTagsList() || [];
					setWebPreview(fetchedWebPreviews.map(webpreviews => ({
						title: webpreviews.getTitle(),
						previewimage: webpreviews.getPreviewimage(),
						url: webpreviews.getUrl(),
						description: webpreviews.getDescription()
					})));
					form.setFieldsValue({
						description: eventData.getDescription(),
						eventTime: [moment(eventData.getStartat()), moment(eventData.getEndat())],
						eventType: eventData.getType(),
						latitude: eventData.getLocation()?.getLat(),
						longitude: eventData.getLocation()?.getLong(),
						numAttendees: eventData.getNumattendees(),
						numSlots: eventData.getNumslots(),
						onlineLink: eventData.getOnlinelink(),
						title: eventData.getTitle(),
					});
					setLoading(false);
				} catch (error) {
					setLoading(false);
					console.error('Error fetching event data:', error);
				}
			}
		};

		fetchData();
	}, [isEditMode, eventId, form]);

	useEffect(() => {
		form.setFieldsValue({
			mediaUrls: mediaurls,
			webPreviews: webpreviews,
			tags: tags
		})
	}, [mediaurls, webpreviews, tags]);

	useEffect(() => {
		if (inputVisible) {
			inputRef.current?.focus();
		}
	}, [inputVisible]);

	useEffect(() => {
		editInputRef.current?.focus();
	}, [editInputValue]);

	const refreshPreview = async () => {
		const values = form.getFieldsValue();
		let location = {}; 
		if (values.address) {
			const coordinates = await fetchCoordinates(values.address);
			if (coordinates?.lat && coordinates?.lng) {
				location = {
					lat: coordinates.lat,
					long: coordinates.lng
				};
			}
		}
	
		if (Array.isArray(values.eventTime) && values.eventTime.length >= 2) {
			const newEventData: IEvent = {
				title: values.title,
				type: values.eventType,
				startAt: values?.eventTime[0],
				endAt: values?.eventTime[1],
				mediaUrls: mediaurls,
				webPreviews: values.webPreviews,
				description: values.description,
				numAttendees: values.numAttendees,
				numSlots: values.numSlots,
				onlineLink: values.onlineLink,
				location, // Use the updated location
				tags: values.tags
			};
			setFormData(newEventData);
		}
	};
	

	const handleClose = (removedTag: string) => {
		const newTags = tags.filter((tag) => tag !== removedTag);
		setTags(newTags);
	};

	const showInput = () => {
		setInputVisible(true);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleInputConfirm = () => {
		if (inputValue && tags.indexOf(inputValue) === -1) {
			setTags([...tags, inputValue]);
		}
		setInputVisible(false);
		setInputValue('');
	};

	const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditInputValue(e.target.value);
	};

	const handleEditInputConfirm = () => {
		const newTags = [...tags];
		newTags[editInputIndex] = editInputValue;
		setTags(newTags);
		setEditInputIndex(-1);
		setEditInputValue('');
	};

	const tagInputStyle: React.CSSProperties = {
		height: 22,
		marginInlineEnd: 8,
		verticalAlign: 'top',
		width: 64
	};

	const tagPlusStyle: React.CSSProperties = {
		borderStyle: 'dashed',
		height: 22
	};

	const onSubmit = async (values: any) => {
		const coordinates = await fetchCoordinates(values.address);
		// Set the values for webPreviews
		const webPreviews = values.webPreviews.map((webPreview: any) => ({
			description: webPreview.description,
			previewImage: webPreview.previewimage,
			title: webPreview.title,
			url: webPreview.url
		}));

		await form.validateFields();
		const event: IEvent = {
			id: eventId,
			description: values.description,
			endAt: values.eventTime[1],
			location: {
				lat: coordinates?.lat,
				long: coordinates?.lng
			},
			mediaUrls: mediaurls,
			numAttendees: values.numAttendees,
			numSlots: values.numSlots,
			onlineLink: values.onlineLink,
			startAt: values.eventTime[0],
			tags: tags,
			title: values.title,
			type: values.eventType,
			webPreviews: webPreviews
		};
		try {
			setLoading(true);
			if (isEditMode) {
				clients.social.event.EditEvent(event, {}, (err, response) => {
					if (err) {
						console.log('Before:-', err);
					} else {
						console.log(response);
						toast('Event Updated successfully.');
						navigate('/events/show')
					}
					setLoading(false);
				})
			} else {
				clients.social.event.CreateEvent(event, {}, (err, response) => {
					if (err) {
						console.log('Before:-', err);
					} else {
						console.log(response);
						toast('Event created successfully.');
					}
					setLoading(false);
					form.resetFields();
				});
			}
		} catch (error) {
			console.log('Catch:-', error);
			setLoading(false);
		}
	};

	const UploadAnimation: React.FC = () => {
		return (
			<div className="flex justify-center items-center">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
			</div>
		);
	};

	return (
		<>
			<div className='flex'>
				<Form
					form={form}
					className="bg-white rounded-md shadow-md p-5"
					initialValues={{
						eventType: EventType.ONLINE
					}}
					onFinish={onSubmit}
					disabled={loading}
				>
					<Form.Item
						name="eventType"
						label="Event Type"
						rules={[
							{
								message: 'Event type is required.',
								required: true
							}
						]}
					>
						<Radio.Group disabled={loading} buttonStyle="solid">
							<Radio.Button value={EventType.ONLINE}>Online</Radio.Button>
							<Radio.Button value={EventType.OFFLINE}>Offline</Radio.Button>
						</Radio.Group>
					</Form.Item>
					<Form.Item
						name="eventTime"
						label="Event Dates"
						rules={[
							{
								message: 'Event dates is required.',
								required: true
							}
						]}
					>
						<RangePicker disabled={loading} showTime />
					</Form.Item>
					<Form.Item
						name="title"
						label="Event title"
						className="max-w-[493px]"
						rules={[
							{
								message: 'Event name is required.',
								required: true
							}
						]}
					>
						<Input disabled={loading} placeholder="eg. Agri" />
					</Form.Item>
					<Form.Item
						name="description"
						label="Event Description"
						className="max-w-[493px]"
						rules={[
							{
								message: 'Event description is required.',
							}
						]}
					>
						<TextArea
							disabled={loading}
							placeholder="eg. All about organic farming"
						/>
					</Form.Item>
					<Form.Item
						name="onlineLink"
						label="Event Online Link"
						className="max-w-[493px]"
						rules={[
							{
								message: 'Event online link is required.',
								validator(rule, value, callback) {
									const otherFieldValue = form.getFieldValue('eventType');
									if (otherFieldValue === EventType.ONLINE && !value) {
										callback(rule?.message?.toString());
									} else {
										callback();
									}
								}
							}
						]}
					>
						<Input
							disabled={loading}
							placeholder="eg. https://meet.google.com/wwu-wdaj-znk"
						/>
					</Form.Item>
					<Form.Item
						name="address"
						label="Event Address"
					>
					<Input
						style={{ width: 'calc(100% - 100px)' }}
						disabled={loading}
						placeholder="123 Main St, City, Country"
					/>
					</Form.Item>
					{/* Media URLs */}
					<div className="mb-4">
						<Button className='text-black' onClick={showModal}>
							Upload Media
						</Button>
						{isUploading && <UploadAnimation />}
					</div>
					{/* Web Previews */}

					<div className="mb-4">
						<Form.List name="webPreviews" initialValue={webpreviews}>
							{(fields, { add, remove }) => (
								<div className="space-y-2">
									{fields.map(({ key, name, ...restField }) => (
										<div key={key} className="flex flex-col space-y-2">
											<Form.Item
												{...restField}
												name={[name, 'title']}
												rules={[{ message: 'Please input title', required: true }]}
												className="flex-1 max-w-[493px]"
											>
												<Input placeholder="Title" />
											</Form.Item>
											<Form.Item
												{...restField}
												name={[name, 'previewimage']}
												className="flex-1 max-w-[493px]"
											>
												<Input placeholder="Preview Image URL" />
											</Form.Item>
											<Form.Item
												{...restField}
												name={[name, 'url']}
												rules={[{ message: 'Please input URL', required: true }]}
												className="flex-1 max-w-[493px]"
											>
												<Input placeholder="URL" />
											</Form.Item>
											<Form.Item
												{...restField}
												name={[name, 'description']}
												className="flex-1 max-w-[493px]"
											>
												<Input placeholder="Description" />
											</Form.Item>
											<MinusCircleOutlined className="text-red-500" onClick={() => remove(name)} />
										</div>
									))}
									<Button type="dashed" onClick={() => add()} className="w-auto mt-2">
										<PlusOutlined /> Add Web Preview
									</Button>
								</div>
							)}
						</Form.List>
					</div>
					{/* Num Attendees */}
					<Form.Item
						name="numAttendees"
						label="Number of Attendees"
						rules={[
							{
								message: 'Number of attendees is required.',
								required: true
							}
						]}
					>
						<InputNumber type="number" placeholder="attendees" />
					</Form.Item>

					{/* Num Slots */}
					<Form.Item
						name="numSlots"
						label="Number of Slots"
						rules={[
							{
								message: 'Number of slots is required.',
								required: true
							}
						]}
					>
						<InputNumber disabled={loading} type="number" placeholder="slots" />
					</Form.Item>
					<Form.Item name="tags" label="Tags" className="max-w-[493px]">
						<Space size={[0, 8]} wrap>
							{tags.map((tag, index) => {
								if (editInputIndex === index) {
									return (
										<Input
											disabled={loading}
											ref={editInputRef}
											key={tag}
											size="small"
											style={tagInputStyle}
											value={editInputValue}
											onChange={handleEditInputChange}
											onBlur={handleEditInputConfirm}
											onPressEnter={handleEditInputConfirm}
										/>
									);
								}
								const isLongTag = tag.length > 20;
								const tagElem = (
									<Tag
										key={tag}
										closable={!loading}
										style={{ userSelect: 'none' }}
										onClose={() => handleClose(tag)}
									>
										<span
											onDoubleClick={(e) => {
												if (index !== 0) {
													setEditInputIndex(index);
													setEditInputValue(tag);
													e.preventDefault();
												}
											}}
										>
											{isLongTag ? `${tag.slice(0, 20)}...` : tag}
										</span>
									</Tag>
								);
								return isLongTag ? (
									<Tooltip title={tag} key={tag}>
										{tagElem}
									</Tooltip>
								) : (
									tagElem
								);
							})}
							{inputVisible ? (
								<Input
									disabled={loading}
									ref={inputRef}
									type="text"
									size="small"
									style={tagInputStyle}
									value={inputValue}
									onChange={handleInputChange}
									onBlur={handleInputConfirm}
									onPressEnter={handleInputConfirm}
								/>
							) : (
								<Tag style={tagPlusStyle} onClick={showInput}>
									<PlusOutlined /> New Tag
								</Tag>
							)}
						</Space>
					</Form.Item>
					<Form.Item>
						<Button disabled={loading} htmlType="submit">
							{isEditMode ? 'Save' : 'Create'}
						</Button>
					</Form.Item>
				</Form>
				<div className="flex-1 p-4 bg-gray-100 rounded-lg shadow-md ml-4"> {/* Styled Preview container */}
					{/* Place the Refresh Preview button here */}
					<button onClick={refreshPreview} className="mb-2 text-white bg-blue-500 hover:bg-blue-700 font-medium py-2 px-4 rounded">
						Refresh Preview
					</button>
					<EventPreview {...formdata} />
				</div>
			</div>


			<Modal title="File Upload" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}
				okButtonProps={{
					children: "Custom OK",
					style: { backgroundColor: 'green', color: 'white' },
				}}
			>

				<div
					className="border-dashed border-2 border-gray-300 p-20 rounded-md cursor-pointer"
					onDrop={handleDrop}
					onDragOver={(e) => e.preventDefault()}
					onClick={triggerFileInput}
				>
					<input
						type="file"
						multiple
						onChange={handleFileChange}
						className="hidden"
						ref={fileInputRef}
					/>
					<p className="text-gray-500 text-center">Drag and drop files here, or click to select files</p>
				</div>
				<ul>
					{files.map((file, index) => (
						<li key={index} className="flex justify-between items-center">
							{file.name}
							<Button
								type="link"
								onClick={() => handleRemoveFile(index)}
								className="text-red-500"
							>
								Remove
							</Button>
						</li>
					))}
				</ul>
			</Modal>
		</>
	);
};

export default Events;
